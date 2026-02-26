import { db } from "../../config/db";
import { users, userSkills, skills, swipes } from "../../db/schema";
import { eq, ne, notInArray, and, sql, inArray } from "drizzle-orm";
import type { UpdateProfileInput } from "./user.schema";

export async function getUserById(userId: string) {
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      image: users.image,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, userId));

  return user ?? null;
}

export async function getUserProfile(userId: string) {
  const user = await getUserById(userId);
  if (!user) return null;

  const teachSkills = await db
    .select({
      skillId: userSkills.skillId,
      name: skills.name,
    })
    .from(userSkills)
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .where(and(eq(userSkills.userId, userId), eq(userSkills.type, "TEACH")));

  const learnSkills = await db
    .select({
      skillId: userSkills.skillId,
      name: skills.name,
    })
    .from(userSkills)
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .where(and(eq(userSkills.userId, userId), eq(userSkills.type, "LEARN")));

  return {
    ...user,
    skillsToTeach: teachSkills,
    skillsToLearn: learnSkills,
  };
}

export async function updateProfile(userId: string, data: UpdateProfileInput) {
  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (data.name !== undefined) updateData.name = data.name;
  if (data.bio !== undefined) updateData.bio = data.bio;
  if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl;

  const [updated] = await db
    .update(users)
    .set(updateData)
    .where(eq(users.id, userId))
    .returning({
      id: users.id,
      name: users.name,
      email: users.email,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      image: users.image,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    });

  return updated ?? null;
}

/**
 * Discover barter-compatible users.
 *
 * Returns users where:
 *   1. They haven't been swiped on yet
 *   2. currentUser.TEACH ∩ candidate.LEARN ≠ ∅
 *   3. currentUser.LEARN ∩ candidate.TEACH ≠ ∅
 *
 * This ensures genuine barter compatibility before showing a card.
 */
export async function discoverUsers(currentUserId: string) {
  // 1. Get the current user's teach & learn skill IDs
  const myTeachRows = await db
    .select({ skillId: userSkills.skillId })
    .from(userSkills)
    .where(and(eq(userSkills.userId, currentUserId), eq(userSkills.type, "TEACH")));

  const myLearnRows = await db
    .select({ skillId: userSkills.skillId })
    .from(userSkills)
    .where(and(eq(userSkills.userId, currentUserId), eq(userSkills.type, "LEARN")));

  const myTeachIds = myTeachRows.map((r) => r.skillId);
  const myLearnIds = myLearnRows.map((r) => r.skillId);

  // If the current user has no teach or learn skills, no barter is possible
  if (myTeachIds.length === 0 || myLearnIds.length === 0) {
    return [];
  }

  // 2. Get IDs the current user has already swiped on
  const swipedRows = await db
    .select({ targetId: swipes.targetId })
    .from(swipes)
    .where(eq(swipes.swiperId, currentUserId));

  const excludeIds = [currentUserId, ...swipedRows.map((r) => r.targetId)];

  // 3. Find users who LEARN something I TEACH
  const usersWhoNeedMySkills = await db
    .select({ userId: userSkills.userId })
    .from(userSkills)
    .where(
      and(
        eq(userSkills.type, "LEARN"),
        inArray(userSkills.skillId, myTeachIds),
        notInArray(userSkills.userId, excludeIds)
      )
    );

  const setA = new Set(usersWhoNeedMySkills.map((r) => r.userId));

  if (setA.size === 0) return [];

  // 4. Find users who TEACH something I LEARN
  const usersWhoCanTeachMe = await db
    .select({ userId: userSkills.userId })
    .from(userSkills)
    .where(
      and(
        eq(userSkills.type, "TEACH"),
        inArray(userSkills.skillId, myLearnIds),
        inArray(userSkills.userId, [...setA]) // narrow to setA only
      )
    );

  const compatibleIds = [...new Set(usersWhoCanTeachMe.map((r) => r.userId))];

  if (compatibleIds.length === 0) return [];

  // 5. Fetch candidate profiles (limit 20)
  const candidates = await db
    .select({
      id: users.id,
      name: users.name,
      bio: users.bio,
      avatarUrl: users.avatarUrl,
      image: users.image,
    })
    .from(users)
    .where(inArray(users.id, compatibleIds))
    .limit(20);

  // 6. Attach skills to each candidate
  const results = await Promise.all(
    candidates.map(async (candidate) => {
      const teachSkills = await db
        .select({ skillId: userSkills.skillId, name: skills.name })
        .from(userSkills)
        .innerJoin(skills, eq(userSkills.skillId, skills.id))
        .where(
          and(eq(userSkills.userId, candidate.id), eq(userSkills.type, "TEACH"))
        );

      const learnSkills = await db
        .select({ skillId: userSkills.skillId, name: skills.name })
        .from(userSkills)
        .innerJoin(skills, eq(userSkills.skillId, skills.id))
        .where(
          and(eq(userSkills.userId, candidate.id), eq(userSkills.type, "LEARN"))
        );

      return {
        ...candidate,
        skillsToTeach: teachSkills,
        skillsToLearn: learnSkills,
      };
    })
  );

  return results;
}

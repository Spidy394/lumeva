import { db } from "../../config/db";
import { matches, users, userSkills, skills } from "../../db/schema";
import { eq, or, and } from "drizzle-orm";

export async function getUserMatches(userId: string) {
  const rows = await db
    .select({
      matchId: matches.id,
      user1Id: matches.user1Id,
      user2Id: matches.user2Id,
      createdAt: matches.createdAt,
    })
    .from(matches)
    .where(or(eq(matches.user1Id, userId), eq(matches.user2Id, userId)))
    .orderBy(matches.createdAt);

  // For each match, fetch the OTHER user's profile + skills
  const results = await Promise.all(
    rows.map(async (match) => {
      const otherUserId =
        match.user1Id === userId ? match.user2Id : match.user1Id;

      const [otherUser] = await db
        .select({
          id: users.id,
          name: users.name,
          bio: users.bio,
          avatarUrl: users.avatarUrl,
          image: users.image,
        })
        .from(users)
        .where(eq(users.id, otherUserId));

      const teachSkills = await db
        .select({ skillId: userSkills.skillId, name: skills.name })
        .from(userSkills)
        .innerJoin(skills, eq(userSkills.skillId, skills.id))
        .where(
          and(eq(userSkills.userId, otherUserId), eq(userSkills.type, "TEACH"))
        );

      const learnSkills = await db
        .select({ skillId: userSkills.skillId, name: skills.name })
        .from(userSkills)
        .innerJoin(skills, eq(userSkills.skillId, skills.id))
        .where(
          and(eq(userSkills.userId, otherUserId), eq(userSkills.type, "LEARN"))
        );

      return {
        matchId: match.matchId,
        matchedAt: match.createdAt,
        user: otherUser
          ? {
              ...otherUser,
              skillsToTeach: teachSkills,
              skillsToLearn: learnSkills,
            }
          : null,
      };
    })
  );

  return results;
}

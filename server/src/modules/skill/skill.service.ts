import { db } from "../../config/db";
import { skills, userSkills } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export async function getAllSkills() {
  return db.select().from(skills).orderBy(skills.name);
}

export async function createSkill(name: string) {
  const id = uuid();
  const [skill] = await db
    .insert(skills)
    .values({ id, name })
    .onConflictDoNothing()
    .returning();

  if (!skill) {
    // Already exists, look it up
    const [existing] = await db
      .select()
      .from(skills)
      .where(eq(skills.name, name));
    return existing;
  }

  return skill;
}

export async function getUserSkills(userId: string) {
  const rows = await db
    .select({
      skillId: userSkills.skillId,
      name: skills.name,
      type: userSkills.type,
    })
    .from(userSkills)
    .innerJoin(skills, eq(userSkills.skillId, skills.id))
    .where(eq(userSkills.userId, userId));

  return rows;
}

export async function addUserSkill(
  userId: string,
  skillId: string,
  type: "TEACH" | "LEARN"
) {
  await db
    .insert(userSkills)
    .values({ userId, skillId, type })
    .onConflictDoNothing();

  return { userId, skillId, type };
}

export async function removeUserSkill(
  userId: string,
  skillId: string,
  type: "TEACH" | "LEARN"
) {
  const deleted = await db
    .delete(userSkills)
    .where(
      and(
        eq(userSkills.userId, userId),
        eq(userSkills.skillId, skillId),
        eq(userSkills.type, type)
      )
    )
    .returning();

  return deleted.length > 0;
}

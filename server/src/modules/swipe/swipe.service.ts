import { db } from "../../config/db";
import { swipes, matches } from "../../db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuid } from "uuid";

export async function recordSwipe(
  swiperId: string,
  targetId: string,
  direction: "LEFT" | "RIGHT"
) {
  // Prevent self-swipe
  if (swiperId === targetId) {
    throw new Error("Cannot swipe on yourself");
  }

  // Insert the swipe (upsert – if already swiped, update direction)
  const [swipe] = await db
    .insert(swipes)
    .values({ id: uuid(), swiperId, targetId, direction })
    .onConflictDoUpdate({
      target: [swipes.swiperId, swipes.targetId],
      set: { direction },
    })
    .returning();

  let matched = false;

  // If RIGHT swipe, check for a mutual match
  if (direction === "RIGHT") {
    const [reciprocal] = await db
      .select()
      .from(swipes)
      .where(
        and(
          eq(swipes.swiperId, targetId),
          eq(swipes.targetId, swiperId),
          eq(swipes.direction, "RIGHT")
        )
      );

    if (reciprocal) {
      // Create a match (store user IDs in sorted order to avoid duplicates)
      const [user1Id, user2Id] =
        swiperId < targetId ? [swiperId, targetId] : [targetId, swiperId];

      await db
        .insert(matches)
        .values({ id: uuid(), user1Id, user2Id })
        .onConflictDoNothing();

      matched = true;
    }
  }

  return { swipe, matched };
}

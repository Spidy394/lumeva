/**
 * Barter compatibility check.
 *
 * User A and User B are compatible if:
 *   A.TEACH ∩ B.LEARN ≠ ∅  (A can teach something B wants to learn)
 *   AND
 *   A.LEARN ∩ B.TEACH ≠ ∅  (B can teach something A wants to learn)
 */
export function isBarterCompatible(
  aTeachSkillIds: string[],
  aLearnSkillIds: string[],
  bTeachSkillIds: string[],
  bLearnSkillIds: string[]
): boolean {
  const aTeachesB = aTeachSkillIds.some((id) => bLearnSkillIds.includes(id));
  const bTeachesA = bTeachSkillIds.some((id) => aLearnSkillIds.includes(id));
  return aTeachesB && bTeachesA;
}

import { z } from "zod";

export const createSkillSchema = z.object({
  name: z.string().min(1).max(100).trim(),
});

export const addUserSkillSchema = z.object({
  skillId: z.string().min(1),
  type: z.enum(["TEACH", "LEARN"]),
});

export type CreateSkillInput = z.infer<typeof createSkillSchema>;
export type AddUserSkillInput = z.infer<typeof addUserSkillSchema>;

import { z } from "zod";

export const recordSwipeSchema = z.object({
  targetId: z.string().min(1),
  direction: z.enum(["LEFT", "RIGHT"]),
});

export type RecordSwipeInput = z.infer<typeof recordSwipeSchema>;

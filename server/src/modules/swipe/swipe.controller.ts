import type { Request, Response } from "express";
import * as swipeService from "./swipe.service";
import { recordSwipeSchema } from "./swipe.schema";
import { sendSuccess, sendError } from "../../utils/response";

export async function recordSwipe(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const parsed = recordSwipeSchema.safeParse(req.body);

    if (!parsed.success) {
      return sendError(res, parsed.error.issues[0]?.message ?? "Invalid input", 400);
    }

    const result = await swipeService.recordSwipe(
      userId,
      parsed.data.targetId,
      parsed.data.direction
    );

    return sendSuccess(res, result, 201);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to record swipe", 500);
  }
}

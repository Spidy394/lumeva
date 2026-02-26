import type { Request, Response } from "express";
import * as userService from "./user.service";
import { updateProfileSchema } from "./user.schema";
import { sendSuccess, sendError } from "../../utils/response";

export async function getProfile(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const profile = await userService.getUserProfile(userId);

    if (!profile) {
      return sendError(res, "User not found", 404);
    }

    return sendSuccess(res, profile);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to fetch profile", 500);
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const parsed = updateProfileSchema.safeParse(req.body);

    if (!parsed.success) {
      return sendError(res, parsed.error.issues[0]?.message ?? "Invalid input", 400);
    }

    const updated = await userService.updateProfile(userId, parsed.data);

    if (!updated) {
      return sendError(res, "User not found", 404);
    }

    return sendSuccess(res, updated);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to update profile", 500);
  }
}

export async function discover(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const candidates = await userService.discoverUsers(userId);
    return sendSuccess(res, candidates);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to discover users", 500);
  }
}

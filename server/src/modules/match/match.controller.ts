import type { Request, Response } from "express";
import * as matchService from "./match.service";
import { sendSuccess, sendError } from "../../utils/response";

export async function getMatches(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const userMatches = await matchService.getUserMatches(userId);
    return sendSuccess(res, userMatches);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to fetch matches", 500);
  }
}

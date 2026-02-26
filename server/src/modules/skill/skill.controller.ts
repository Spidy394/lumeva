import type { Request, Response } from "express";
import * as skillService from "./skill.service";
import { createSkillSchema, addUserSkillSchema } from "./skill.schema";
import { sendSuccess, sendError } from "../../utils/response";

export async function getAll(_req: Request, res: Response) {
  try {
    const allSkills = await skillService.getAllSkills();
    return sendSuccess(res, allSkills);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to fetch skills", 500);
  }
}

export async function create(req: Request, res: Response) {
  try {
    const parsed = createSkillSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, parsed.error.issues[0]?.message ?? "Invalid input", 400);
    }

    const skill = await skillService.createSkill(parsed.data.name);
    return sendSuccess(res, skill, 201);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to create skill", 500);
  }
}

export async function getMySkills(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const userSkills = await skillService.getUserSkills(userId);
    return sendSuccess(res, userSkills);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to fetch user skills", 500);
  }
}

export async function addSkill(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const parsed = addUserSkillSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, parsed.error.issues[0]?.message ?? "Invalid input", 400);
    }

    const result = await skillService.addUserSkill(
      userId,
      parsed.data.skillId,
      parsed.data.type
    );
    return sendSuccess(res, result, 201);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to add skill", 500);
  }
}

export async function removeSkill(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const skillId = req.params.skillId as string;
    const type = req.params.type as string;

    if (!skillId || !type || !["TEACH", "LEARN"].includes(type)) {
      return sendError(res, "Invalid skill ID or type", 400);
    }

    const removed = await skillService.removeUserSkill(
      userId,
      skillId,
      type as "TEACH" | "LEARN"
    );

    if (!removed) {
      return sendError(res, "Skill not found on your profile", 404);
    }

    return sendSuccess(res, { message: "Skill removed" });
  } catch (error: any) {
    return sendError(res, error?.message ?? "Failed to remove skill", 500);
  }
}

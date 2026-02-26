import { Router } from "express";
import * as skillController from "./skill.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

// Global skills
router.get("/", requireAuth, skillController.getAll);
router.post("/", requireAuth, skillController.create);

// User's own skills
router.get("/my", requireAuth, skillController.getMySkills);
router.post("/my", requireAuth, skillController.addSkill);
router.delete("/my/:skillId/:type", requireAuth, skillController.removeSkill);

export default router;

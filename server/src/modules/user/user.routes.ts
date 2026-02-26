import { Router } from "express";
import * as userController from "./user.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.get("/me", requireAuth, userController.getProfile);
router.patch("/me", requireAuth, userController.updateProfile);
router.get("/discover", requireAuth, userController.discover);

export default router;

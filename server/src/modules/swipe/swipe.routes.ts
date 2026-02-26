import { Router } from "express";
import * as swipeController from "./swipe.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, swipeController.recordSwipe);

export default router;

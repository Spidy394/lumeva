import { Router } from "express";
import * as swipeController from "./swipe.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { rateLimiter } from "../../middleware/rateLimit.middleware";

const router = Router();

// 50 swipes per 10 minutes per user
router.post("/", requireAuth, rateLimiter(50, 10 * 60 * 1000), swipeController.recordSwipe);

export default router;

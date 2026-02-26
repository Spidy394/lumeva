import { Router } from "express";
import * as matchController from "./match.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", requireAuth, matchController.getMatches);

export default router;

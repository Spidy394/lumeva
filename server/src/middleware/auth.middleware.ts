import type { Request, Response, NextFunction } from "express";
import { auth } from "../config/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
}

import type { Request, Response, NextFunction } from "express";

/**
 * In-memory sliding-window rate limiter.
 * Tracks timestamps per user and rejects requests that exceed the limit
 * within the configured window.
 */
export function rateLimiter(
  maxRequests: number = 50,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
) {
  const store = new Map<string, number[]>();

  return (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
      // If there's no user (shouldn't happen behind requireAuth), skip
      return next();
    }

    const now = Date.now();
    const timestamps = store.get(userId) ?? [];

    // Remove expired timestamps outside the window
    const valid = timestamps.filter((ts) => now - ts < windowMs);

    if (valid.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please slow down.",
      });
    }

    valid.push(now);
    store.set(userId, valid);

    next();
  };
}

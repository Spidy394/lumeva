import type { Request, Response } from "express";
import * as authService from "./auth.service";
import { sendSuccess, sendError } from "../../utils/response";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return sendError(res, "Email, password, and name are required", 400);
    }

    const result = await authService.register(email, password, name);
    return sendSuccess(res, { user: result.user }, 201);
  } catch (error: any) {
    return sendError(res, error?.message ?? "Registration failed", 400);
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const betterAuthResponse = await authService.login(email, password, req.headers);

    // Forward Set-Cookie so the client maintains the session
    const setCookie = betterAuthResponse.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    if (!betterAuthResponse.ok) {
      const errData = (await betterAuthResponse.json()) as any;
      return sendError(res, errData?.message ?? "Login failed", betterAuthResponse.status);
    }

    const data = (await betterAuthResponse.json()) as any;
    return sendSuccess(res, { user: data.user });
  } catch (error: any) {
    return sendError(res, error?.message ?? "Login failed", 400);
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const betterAuthResponse = await authService.logout(req.headers);

    // Forward Set-Cookie to clear the session cookie on the client
    const setCookie = betterAuthResponse.headers.get("set-cookie");
    if (setCookie) {
      res.setHeader("set-cookie", setCookie);
    }

    return sendSuccess(res, { message: "Logged out successfully" });
  } catch (error: any) {
    return sendError(res, error?.message ?? "Logout failed", 400);
  }
}

export async function me(req: Request, res: Response) {
  return sendSuccess(res, { user: req.user });
}

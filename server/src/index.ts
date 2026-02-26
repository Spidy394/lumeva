import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes";
import skillRouter from "./modules/skill/skill.routes";
import swipeRouter from "./modules/swipe/swipe.routes";
import matchRouter from "./modules/match/match.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// CORS
app.use((req, res, next) => {
  const origin = process.env.CLIENT_URL ?? "http://localhost:3000";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// BetterAuth handler must be mounted BEFORE express.json()
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/skills", skillRouter);
app.use("/api/swipes", swipeRouter);
app.use("/api/matches", matchRouter);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

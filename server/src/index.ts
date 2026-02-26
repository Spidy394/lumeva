import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";

const app = express();

// Auth handler must be mounted BEFORE express.json()
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
});

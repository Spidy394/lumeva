import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 3000");
})
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { postRoutes } from "./routes/post.routes.js";
import { reelRouter } from "./routes/reel.routes.js";
import { storyRouter } from "./routes/story.routes.js";
import { messageRouter } from "./routes/message.routes.js";
import { app, server } from "./socket.js";

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/reel", reelRouter);
app.use("/api/story", storyRouter);
app.use("/api/message", messageRouter);

const port = process.env.PORT;
server.listen(port, () => {
  connectDb();
  console.log(`server running on port http://localhost:${port}`);
});

import express from "express";
import { isAuth } from "../middleware/isauth.middleware.js";
import { upload } from "../config/multer.js";
import { comments, getAllReels, like, uploadReel } from "../controllers/reel.controller.js";

export const reelRouter = express.Router();

reelRouter.post("/upload", isAuth, upload.single("media"),uploadReel);
reelRouter.get("/like/:reelId", isAuth, like);
reelRouter.get("getall", isAuth, getAllReels)
reelRouter.post("/comments", isAuth, comments);



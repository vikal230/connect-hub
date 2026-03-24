import express from "express";
import { isAuth } from "../middleware/isauth.middleware.js";

import { comments, getAllPost, like, saved, uploadPost } from "../controllers/post.controller.js";
import { upload } from "../config/multer.js";
export const postRoutes = express.Router();

postRoutes.post("/upload", isAuth, upload.single("media"),uploadPost);
postRoutes.get("/getall", isAuth, getAllPost);
postRoutes.get("/like/:postId", isAuth, like);
postRoutes.get("/saved/:postId", isAuth, saved);
postRoutes.post("/comments", isAuth, comments);



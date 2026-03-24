import express from "express";
import { isAuth } from "../middleware/isauth.middleware.js";
import { upload } from "../config/multer.js";
import { UploadStory, viewStory, getStoryByUserName } from "../controllers/story.controller.js"; 

export const storyRouter = express.Router();

storyRouter.post("/upload", isAuth, upload.single("media"), UploadStory);

storyRouter.get("/view/:storyId", isAuth, viewStory);

storyRouter.get("/user/:userName", isAuth, getStoryByUserName);
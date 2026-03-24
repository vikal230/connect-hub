import express from "express";
import { isAuth } from "../middleware/isauth.middleware.js";
import {
  editProfile,
  getCurrentUser,
  getProfile,
  suggestedUser,
} from "../controllers/user.controller.js";
import { upload } from "../config/multer.js";
export const userRoutes = express.Router();

userRoutes.get("/current", isAuth, getCurrentUser);
userRoutes.get("/suggest", isAuth, suggestedUser);
userRoutes.get("/getprofile/:userName", isAuth, getProfile);
userRoutes.post(
  "/editprofile",
  isAuth,
  upload.single("profileImage"),
  editProfile,
);

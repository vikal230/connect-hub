import express from "express";
import { isAuth } from "../middleware/isauth.middleware.js";
import {
  editProfile,
  follow,
  follwingList,
  getAllNotifications,
  getCurrentUser,
  getProfile,
  markAsReadNotifications,
  search,
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
userRoutes.get("/search", isAuth, search)
userRoutes.get("/follow/:targetUserId", isAuth, follow)
userRoutes.get("/followinglist", isAuth, follwingList)
userRoutes.get("/notifications", isAuth, getAllNotifications)
userRoutes.post("/markasread", isAuth, markAsReadNotifications)

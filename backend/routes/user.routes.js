import express from "express"
import { isAuth } from "../middleware/isauth.middleware.js"
import { getCurrentUser, suggestedUser } from "../controllers/user.controller.js"
export const userRoutes = express.Router()

userRoutes.get("/current", isAuth, getCurrentUser)
userRoutes.get("/suggest", isAuth, suggestedUser)

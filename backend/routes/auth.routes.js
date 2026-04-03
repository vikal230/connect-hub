 import express from "express"
import { isVerify, resetPassword, sendOtp, signIn, signOut, signup} from "../controllers/auth.controllers.js"

export const authRoutes = express.Router()

 authRoutes.post("/signup", signup)
 authRoutes.post("/signin", signIn)
 authRoutes.get("/signout", signOut)
 authRoutes.post("/sendotp", sendOtp)
 authRoutes.post("/isverify", isVerify)
 authRoutes.post("/resetpassword", resetPassword)
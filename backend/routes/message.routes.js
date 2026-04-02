import express from "express";
import {
  sendMessage,
  getAllMessages,
  getPrevUserChats,
} from "../controllers/message.controller.js";
import  {isAuth}  from "../middleware/isauth.middleware.js";
import { upload } from "../config/multer.js";

export const messageRouter = express.Router();

messageRouter.post(
  "/send/:receiverId",
  isAuth,
  upload.single("image"),
  sendMessage,
);
messageRouter.get("/getAll/:receiverId", isAuth, getAllMessages);
messageRouter.get("/prevchats", isAuth, getPrevUserChats);
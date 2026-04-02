import Message from "../models/message.model.js";
import { uploadCloudinary } from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import { io, getSocketId } from "../socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;
    const { message } = req.body;

    // Create a new message document
    let image;
    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }

    const newMessage = await Message.create({
      sender: senderId,
      receiver: receiverId,
      message,
      image,
    });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();

    const receiverSocketId = getSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res
      .status(200)
      .json({ message: "Message sent successfully", conversation, newMessage });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const senderId = req.userId;
    const receiverId = req.params.receiverId;

    const conversations = await Conversation.find({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json({ conversations });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPrevUserChats = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const conversations = await Conversation.find({
      participants: { $in: [currentUserId] },
    })
      .populate("messages")
      .populate("participants")
      .sort({ updatedAt: -1 });

    const userMap = {};
    conversations.forEach((conv) => {
      conv.participants.forEach((user) => {
        if (user._id != currentUserId) {
          userMap[user._id] = user;
        }
      });
    });

    const previousUser = Object.values(userMap);

    return res.status(200).json({ previousUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

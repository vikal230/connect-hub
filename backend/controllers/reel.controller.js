import { uploadCloudinary } from "../config/cloudinary.js";
import fs from "fs";
import Reel from "../models/reel.model.js";
import User from "../models/user.model.js";

export const uploadReel = async (req, res) => {
  try {
    const { caption } = req.body;

    // 1. VALIDATE
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // 2. UPLOAD
    const mediaResult = await uploadCloudinary(req.file.path);
    if (!mediaResult) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed!",
      });
    }

    // 4. DB SAVE
    const reel = await Reel.create({
      caption,
      media: mediaResult.secure_url,
      author: req.userId,
    });

    // 5. LINK - User model mein reel add karo
    await User.findByIdAndUpdate(req.userId, { $push: { reels: reel._id } });

    // POPULATE
    await reel.populate("author", "name userName profileImage");

    return res
      .status(201)
      .json({ success: true, message: "Reel uploaded!", reel });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error: ${error.message}` });
  }
};

export const like = async (req, res) => {
  try {
    const reelId = req.params.reelId;

    const reel = await Reel.findById(reelId);

    if (!reel) {
      return res.status(400).json({
        success: false,
        message: "reel not found!",
      });
    }

    const isLiked = reel.likes.includes(req.userId);
    const updateReel = await Reel.findByIdAndUpdate(
      reelId,
      isLiked
        ? { $pull: { likes: req.userId } }
        : { $addToSet: { likes: req.userId } },
      { new: true },
    ).populate("author", "name userName profileImage");

    return res.status(200).json({
      success: true,
      message: isLiked
        ? "Post unliked successfully!"
        : "Post liked successfully!",
      post: updateReel,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `reel like error aa rha ${error}`,
    });
  }
};

export const comments = async (req, res) => {
  try {
    const { message } = req.body;
    const reelId = req.params.reelId;
    const reel = await Reel.findById(reelId);

    if (!reel) {
      return res.status(400).json({
        success: false,
        message: "reel not found!",
      });
    }

    reel.comments.push({
      author: req.userId,
      message,
    });

    await reel.save();
    await reel.populate("author", "name userName profileImage");
    await reel.populate("comments.author", "name userName profileImage");

    return res
      .status(200)
      .json({ success: true, message: "Comment added!", reel });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `comments like error aa rha ${error}`,
    });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Reel.find({})
      .populate("author", "name userName profileImage")
      .populate("comments.author");
    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      reels,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get AllPost Error: ${error.message}`,
    });
  }
};

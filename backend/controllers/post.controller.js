import { uploadCloudinary } from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { io } from "../socket.js";
import Notification from "../models/notification.model.js";
import { getSocketId } from "../socket.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Media is Required!",
      });
    }

    // 1. Cloudinary par upload
    const mediaResult = await uploadCloudinary(req.file);
    if (!mediaResult) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed!",
      });
    }

    console.log("post controller upload", mediaResult);
    const post = await Post.create({
      caption,
      mediaType,
      media: mediaResult,
      author: req.userId,
    });

    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: post._id },
    });

    await post.populate("author", "name userName profileImage");

    return res.status(201).json({
      success: true,
      message: "Post uploaded successfully!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Upload post error: ${error.message}`,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name userName profileImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get AllPost Error: ${error.message}`,
    });
  }
};

export const like = async (req, res) => {
  try {
    const postId = req.params.postId;
    const senderId = req.userId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    // const isLiked = post.likes.includes(req.userId);
    const isLiked = post.likes.includes(senderId);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      isLiked
        ? { $pull: { likes: req.userId } }
        : { $addToSet: { likes: req.userId } },
      { returnDocument: "after" },
    )
      .populate("author", "name userName profileImage")
      .populate("comments.author", "name userName profileImage");

    if (!isLiked && post.author.toString() !== senderId.toString()) {
      const newNotification = await Notification.create({
        sender: senderId,
        receiver: post.author,
        message: "liked your post",
        type: "like",
        post: postId,
      });

      // Populate sender info to show in notification
      const populatedNotif = await newNotification.populate(
        "sender receiver post",
      );

      // Socket Emit to specific receiver
      const receiverSocketId = getSocketId(post.author);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", populatedNotif);
      }
    }

    io.emit("likedPost", updatedPost);

    return res.status(200).json({
      success: true,
      message: isLiked
        ? "Post unliked successfully!"
        : "Post liked successfully!",
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Like error: ${error.message}`,
    });
  }
};

export const comments = async (req, res) => {
  try {
    const { message } = req.body;
    const postId = req.params.postId;
    const senderId = req.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(400).json({
        success: false,
        message: "post is not define!",
      });
    }

    post.comments.push({
      author: req.userId,
      message,
    });

    if (senderId.toString() !== post.author.toString()) {
      const newNotification = await Notification.create({
        sender: senderId,
        receiver: post.author,
        message: "commented on your post",
        type: "comment",
        post: postId,
      });
      const populatedNotification = await newNotification.populate(
        "sender receiver post",
      );
      const receiverSocketId = getSocketId(post.author);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newNotification", populatedNotification);
      }
    }

    await post.save();

    await post.populate("author", "name userName profileImage");
    await post.populate("comments.author", "name userName profileImage");

    io.emit("CommentedPost", post);
    return res.status(200).json({
      success: true,
      message: "Comment added successfully!",
      post: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: `comments error ${error}`,
    });
  }
};

export const saved = async (req, res) => {
  try {
    const postId = req.params.postId;
    const user = await User.findById(req.userId);

    const isSaved = user.saved.includes(postId);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      isSaved ? { $pull: { saved: postId } } : { $addToSet: { saved: postId } },
      { new: true },
    ).populate("saved");

    return res.status(200).json({
      success: true,
      message: isSaved
        ? "Post unsaved successfully!"
        : "Post saved successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Post saved error: ${error.message}`,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    if (post.author.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own post!",
      });
    }

    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(req.userId, { $pull: { posts: postId } });
    await User.updateMany({}, { $pull: { saved: postId } });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
      postId,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Delete post error: ${error.message}`,
    });
  }
};

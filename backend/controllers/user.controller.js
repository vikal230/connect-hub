import User from "../models/user.model.js";
import { uploadCloudinary } from "../config/cloudinary.js";
import { getSocketId, io } from "../socket.js";
import Notification from "../models/notification.model.js";
/**
 * @route GET /api/user/current
 * @description Fetch the currently logged-in user's profile data (excluding password)
 * @access Private (Requires isAuth middleware)
 * @param {Object} req - Express request object (expects req.userId from isAuth)
 * @param {Object} res - Express response object
 * @returns {Object} 200 - User data fetched successfully
 * @returns {Object} 401 - User not found or unauthorized
 * @returns {Object} 500 - Internal server error
 */

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId)
      .select("-password")
      // .populate("posts")
      // .populate("reels")
      .populate("story")
      .populate("following")
      .populate({
        path: "posts",
        populate: [{ path: "author" }, { path: "comments" }],
      })
      .populate({
        path: "saved",
        populate: { path: "author" },
      })
      .populate("reels");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user is fetched!",
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getcurrent user controller error ${error}`,
    });
  }
};

export const suggestedUser = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "-password",
    );

    return res.status(200).json({
      success: true,
      message: "users Suggest successfully!",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: `suggesteduser Error ${error}`,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;

    const user = await User.findOne({ userName })
      .select("-password")
      .populate("posts reels followers following");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User found Succesfully!",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `get profile error ${error}` });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, profession, gender, bio } = req.body;

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not found!",
      });
    }

    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password",
    );
    if (
      sameUserWithUserName &&
      sameUserWithUserName._id.toString() !== req.userId.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "userName Already Exist!",
      });
    }

    let profileImage;
    if (req.file) {
      profileImage = await uploadCloudinary(req.file.path);
    }

    user.name = name;
    user.userName = userName;
    user.profileImage = profileImage || user.profileImage;
    user.gender = gender;
    user.bio = bio;
    user.profession = profession;

    await user.save();
    const updatedUser = await User.findById(req.userId).select("-password");
    return res.status(200).json({
      success: true,
      message: "User Profile Edit Succesfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.log("EDIT PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: `user profile Edit error ${error}`,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const currentUserId = req.userId;
    const targetUserId = req.params.targetUserId;

    // console.log(currentUserId, targetUserId)

    if (!targetUserId) {
      return res.status(400).json({
        success: false,
        message: "target user is not found!",
      });
    }

    if (currentUserId == targetUserId) {
      return res.status(400).json({
        success: false,
        message: "you can not follow your self!",
      });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId.toString(),
    );
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() != targetUserId,
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() != currentUserId,
      );

      await currentUser.save();
      await targetUser.save();
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);

      if (targetUser._id != currentUser._id) {
        const newNotification = await Notification.create({
          sender: currentUser._id,
          receiver: targetUser._id,
          message: "started following you",
          type: "follow",
        });

        const populatedNotification =
          await newNotification.populate("sender receiver");
        const receiverSocketId = getSocketId(targetUser._id);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit(
            "newNotification",
            populatedNotification,
          );
        }
      }

      await currentUser.save();
      await targetUser.save();
    }

    const updatedUser = await User.findById(currentUserId)
      .populate("following")
      .select("-password");

    return res.status(200).json({
      success: true,
      message: isFollowing
        ? "Unfollow successfully!"
        : "Following successfully!",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `following error aa rha hai ${error}`,
    });
  }
};

export const follwingList = async (req, res) => {
  try {
    const following = await User.findById(req.userId);

    return res.status(200).json(following);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `following list error aa rha hai ${error}`,
    });
  }
};

export const search = async (req, res) => {
  try {
    const keyword = req.query.keyword;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        message: "keyword is required for search!",
      });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { userName: { $regex: keyword, $options: "i" } },
      ],
    }).select("-password");
    return res.status(200).json({
      success: true,
      message: "search successfully!",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `search error aa rha hai ${error}`,
    });
  }
};


export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({receiver: req.userId})
      .populate("sender receiver post reel")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "all notifications fetched successfully!",
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `all notifications fetching error ${error}`,
    });
  }
};


export const markAsReadNotifications = async (req, res) => {
  try {
    const {notificationId} = req.body
    
    if(Array.isArray(notificationId)){
    await Notification.updateMany(
      { _id: { $in: notificationId }, receiver: req.userId},
      { $set: { isRead: true } }
    )
    } else {
      await Notification.updateOne(
        { _id: notificationId, receiver: req.userId},
        { $set: { isRead: true } }
      )
    }
    const notifications = await Notification.find({ receiver: req.userId })
      .populate("sender receiver post reel")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "all notifications marked as read successfully!",
      notifications,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `mark as read notifications error ${error}`,
    });
  }
}

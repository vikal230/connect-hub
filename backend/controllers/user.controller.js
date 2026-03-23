import User from "../models/user.model.js";
import { uploadCloudinary } from "../config/cloudinary.js";
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
    const user = await User.findById(userId).select("-password").populate("posts")
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

    const user = await User.findOne({ userName }).select("-password");
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
    if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({
        success: false,
        message: "userName Already Exist!",
      });
    }

    let profileImage;
    if (req.file) {
      const result = await uploadCloudinary(req.file.path);
      profileImage = result.secure_url;
    }

    user.name = name;
    user.userName = userName;
    user.profileImage = profileImage || user.profileImage;
    user.gender = gender;
    user.bio = bio;
    user.profession = profession;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Profile Edit Succesfully!",
    });
  } catch (error) {
    console.log("EDIT PROFILE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: `user profile Edit error ${error}`,
    });
  }
};

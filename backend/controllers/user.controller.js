import User from "../models/user.model.js";

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
    const user = await User.findById(userId).select("-password");
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

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { gentoken } from "../config/token.js";
import { sendMail, sendVerifyMail } from "../config/Mail.js";
/**
 * @route POST /api/auth/signup
 * @description Register a new user with name, username, email and password
 * @access Public
 * @param {Object} req.body - User details
 * @param {string} req.body.name - User full name
 * @param {string} req.body.userName - Unique username
 * @param {string} req.body.email - User email address
 * @param {string} req.body.password - User password (min 6 characters)
 * @returns {Object} 201 - User created successfully with token cookie
 */
export const signup = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email Already Exist!",
      });
    }

    const findByUsername = await User.findOne({ userName });
    if (findByUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already Exist!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      userName: user.userName,
    };

    return res.status(201).json({
      success: true,
      message: "User created Successfully!",
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user signup error ${error.message}`,
    });
  }
};

/**
 * @route POST /api/auth/signin
 * @description Authenticate user using username and password
 * @access Public
 * @param {Object} req.body - Login credentials
 * @param {string} req.body.userName - Registered username
 * @param {string} req.body.password - User password
 * @returns {Object} 200 - Login successful with token cookie
 */
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is wrong!",
      });
    }

    const token = await gentoken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "strict",
    });

    const userResponse = {
      _id: user._id,
      userName: user.userName,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `signin error ${error.message}`,
    });
  }
};

/**
 * @route POST /api/auth/signout
 * @description Logout user by clearing authentication cookie (and blacklist token if implemented)
 * @access Public
 * @returns {Object} 200 - User logged out successfully
 */
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    return res.status(200).json({
      success: true,
      message: "user logout successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `user logout error ${error}`,
    });
  }
};


/**
 * @description Generates a 4-digit OTP and sends it to the user's email.
 * @param {Object} req.body - Requires { email }
 * @returns {Object} Success message or error
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Frontend se ye email aaya:", req.body.email);

    console.log("Frontend se ye data aaya:", req.body);
    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not Exists please Try another Email!!",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    user.isOtpVerify = false;

    await user.save();
    await sendMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `send otp function error ${error.message}`,
    });
  }
};

/**
 * @description Verifies the provided OTP and checks for expiration.
 * @param {Object} req.body - Requires { email, otp }
 * @returns {Object} Verification success or error
 */
export const isVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email.trim() });
    if (!user || user.resetOtp !== String(otp)) {
      return res.status(400).json({
        success: false,
        message: "please enter correct otp!",
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one."
      });
    }

    user.isOtpVerify = true;
    user.resetOtp = undefined;
    user.otpExpire = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verify",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `email verification error ${error}`,
    });
  }
};

/**
 * @description Resets the user's password after successful OTP verification.
 * @param {Object} req.body - Requires { email, password }
 * @returns {Object} Password reset success or error
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim() });

    if (!user || !user.isOtpVerify) {
      return res.status(400).json({
        success: false,
        message: "OTP verification required!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.isOtpVerify = false;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "password Reset Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `otp verify required error! ${error.message}`,
    });
  }
};

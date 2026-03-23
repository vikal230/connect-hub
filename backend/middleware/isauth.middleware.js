import jwt from "jsonwebtoken";

/**
 * @middleware isAuth
 * @description Verify JWT token from cookies and authorize the user
 * @param {Object} req - Express request object (expects req.cookies.token)
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Proceeds to the next controller if valid, else returns 401/500 error
 */
export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }

    const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `isAuth Middleware error ${error}`,
    });
  }
};

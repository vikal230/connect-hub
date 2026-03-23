import jwt from "jsonwebtoken"

/**
 * @description Generate a JWT token for the authenticated user
 * @param {string} userId - The unique MongoDB ID of the user (_id)
 * @returns {Promise<string>} The generated JWT token string
 */

export const gentoken = async (userId) => {
  try {
    const token = await jwt.sign({userId}, process.env.SECRET_KEY, {expiresIn:"10y"})
    return token
  } catch (error) {
    console.log(`token create error ${error}`)
  }
}
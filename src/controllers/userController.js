import httpStatus from "http-status";
import User from "../models/userModel.js"

export const listUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res 
      .status()
      .json(users);
  } catch (error) {
    res 
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message,
      });
  }
}
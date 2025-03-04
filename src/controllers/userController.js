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
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res
      .status()
      .json(newUser);
  } catch (error) {
    res
    .status(httpStatus.INTERNAL_SERVER_ERROR)
    .json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }
    res
      .status()
      .json(updatedUser);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message,
      });
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }
    res
      .status()
      .json(user);
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message,
      });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Usuário não encontrado" });
    }
    res
      .status()
      .json({ message: "Usuário excluido" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        message: error.message,
      });
  }
};
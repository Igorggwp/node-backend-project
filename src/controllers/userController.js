import User from "../models/userModel.js";
import crypto from "../utils/crypto.js";

export const login = async (req, res, next) => {
  /*
  #swagger.tags = ["Login"]
  */

  req.user = await User.findOne({
    email: req.body.email,
    password: crypto(req.body.password),
  });

  next();
}

export const showUser = async (req, res, next) => {
  /*
  #swagger.tags = ["Users"]
  #swagger.responses[200]
  */

  try {
    const user = await User.findOne(req.params);

    const data = res.hateos_item(user);
    res.ok(data);
  } catch (err) {
    next(err);
  }
}

export const listUsers = async (req, res, next) => {
  /*
  #swagger.tags = ["Users"]
  #swagger.responses[200]
  */

  try {
    const page = parseInt(req.query._page) || 1;
    const size = parseInt(req.query._size) || 10;
    const sortField = req.query._sort || "name";
    const sortOrder = req.query._order === "desc" ? -1 : 1;

    const offset = (page - 1) * size;

    const users = await User
      .find({})
      .sort({ [sortField]: sortOrder })
      .skip(offset)
      .limit(size);

    const totalData = await User.countDocuments();
    const totalPages = Math.ceil(totalData / size);

    const data = res.hateos_list("users", users, totalPages);
    res.ok(data);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  /*
  #swagger.tags = ["Users"]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/User" }
  }
  #swagger.responses[201]
  */

  try {
    await new User(req.body).save();

    res.created();
  } catch (err) {
    next(err);
  }
}

export const editUser = async (req, res, next) => {
  /*
  #swagger.tags = ["Users"]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/User" }
  }
  #swagger.responses[200]
  */

  try {
    const user = await User.findOneAndUpdate(req.params, req.body, { new: true });

    const data = res.hateos_item(user);
    res.ok(data);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req, res, next) => {
  /*
  #swagger.tags = ["Users"]
  #swagger.responses[204]
  */

  try {
    await User.findByIdAndDelete(req.params._id);

    res.no_content();
  } catch (err) {
    next(err);
  }
}

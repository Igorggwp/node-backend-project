import Task from "../models/taskModel.js";
import publish from "../services/publish.js";

export const getActiveTasks = async (req, res, next) => {
  /*
  #swagger.tags = ["Tasks"]
  #swagger.responses[200]
  */

  try {
    const tasks = await Task.find({ done: false }, "_id description");

    res.ok(tasks);
  } catch (err) {
    next(err);
  }
}

export const createTask = async (req, res, next) => {
  /*
  #swagger.tags = ["Tasks"]
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/Task" }
  }
  #swagger.responses[201]
  */

  try {
    const task = await new Task({
      description: req.body.description,
      done: false,
    }).save();

    await publish("TaskCreated", {
      id: task._id,
      description: task.description,
      callback: {
        href: `${process.env.SERVER}${req.baseUrl}/${task._id}/done`,
        method: "PATCH",
        token: task.token,
      }
    });

    res.created();
  } catch (err) {
    next(err);
  }
}

export const doneTask = async (req, res, next) => {
  /*
  #swagger.tags = ["Tasks"]
  #swagger.responses[200]
  */

  try {
    const token = req.header("x-api-key");
    const task = await Task.findOne({
      _id: req.params._id,
      done: false,
      token,
    });

    if (!task) {
      return res.unauthorized();
    }

    await Task.findByIdAndUpdate(req.params._id, { $set: { done: true }});

    res.ok();
  } catch (err) {
    next(err);
  }
}

import { Router } from "express";

import {
  getActiveTasks,
  createTask,
  doneTask,
} from "../controllers/taskController.js";

import { verify } from "../controllers/authController.js";
import { whitelist } from "../middlewares/whitelist.js";

import validator from "../middlewares/validator.js";
import taskValidator from "./taskValidator.js";

const router = Router();
router.get("/", verify, getActiveTasks);
router.post("/", verify, validator(taskValidator), createTask);
router.patch("/:_id/done", whitelist, doneTask);

export default router;

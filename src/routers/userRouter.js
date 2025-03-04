import { Router } from "express";
import {
  listUsers,
  createUser,
  updateUser,
  getUserById,
  deleteUser
} from "../controllers/userController.js";

const router = Router();
router.get("/", listUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);

export default router;

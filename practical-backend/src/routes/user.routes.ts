import { Router } from "express";
const router = Router();
import {
  verifyToken
} from "../middleware/auth.middleware";
import {
  login
} from "../controllers/auth.controller";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.controller";


router.post("/login", login);
router.get("/users",verifyToken , getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;

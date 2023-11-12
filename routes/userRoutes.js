// userRoutes.js
import express from "express";
import {
  registerUser,
  userLogin,
  listUser,
  updatedUser,
} from "../controllers/userController.js";
import { authMiddleware, verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.get("/", verifyToken, listUser); // Ensure verifyToken is imported from authMiddleware.js
router.put("/:id", authMiddleware, verifyToken, updatedUser); // Assuming you want to use both middlewares

export default router;

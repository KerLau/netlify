// userRoutes.js
import express from "express";
import {
  registerUser,
  userLogin,
  listUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.get("/", listUser); // Ensure verifyToken is imported from authMiddleware.js
// router.put("/:id", authMiddleware, verifyToken, updatedUser); // Assuming you want to use both middlewares

export default router;

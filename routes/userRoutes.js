import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import { registerUser, userLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);

export default router;

import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import {
  registerUser,
  userLogin,
  listUser,updatedUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.get("/", listUser);
router.put("/:id",updatedUser);
export default router;

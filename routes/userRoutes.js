import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import { registerUser, userLogin } from "../controllers/userController.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", authMiddleware, userLogin);
router.post("/register", registerUser);
router.get("/users", (req, res) => { 
    const token = req.header("Authorization");
    try {
        jwt.verify(token, process.env.SECRET_KEY)
    } catch(err){ 
        console.error(err)
        res.status(401).send("The token is not valid!")
    }

    User.find().then((arr)=> {
        res.send(arr)
    })
});


export default router;

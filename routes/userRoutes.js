import { Router } from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = Router();

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

// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import matchPassword from "../utils/matchPassword.js";

export const authMiddleware = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Parameters missing in the body");
  }

  const user = await User.findOne({ email });

  if (user && (await matchPassword(password, user.password))) {
    req.user = user;
    next();
  } else {
    return res.status(401).send("Invalid email or password");
  }
};

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1]; // This is your actual token

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token." });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "Authorization token is required" });
  }
};

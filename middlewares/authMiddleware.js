import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authorizationHandler = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default authorizationHandler;

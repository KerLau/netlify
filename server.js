import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import cors from "cors";
import User from "./models/userModel.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
app.use(cors());

const app = express();
const port = process.env.PORT || 6969;

connectDB();

app.use(express.json());


const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.id;
    next();
  });
};

app.put("/user/:id", cors(), verifyToken, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashedPassword },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server started and running on port : ${port}`);
});

app.use("/api/users", userRoutes);

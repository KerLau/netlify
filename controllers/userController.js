import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const userLogin = async (req, res, next) => {
  const { user } = req;

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

const updatedUser = async (req, res) => {
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
}
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Check if all fields are filled
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const userExists = await User.findOne({ email });
  // Check if user exists
  if (userExists) {
    return res.status(400).json({ message: "Email already in use" });
  }
  // Create new user
  const user = new User({ name, email, password });
  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  // Save user

  await user.save();

  // Send response
  return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

const listUser = async (req, res) => {
  const token = req.header("Authorization");

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).send("The token is not valid!");
  }

  User.find().then((arr) => {
    return res.send(arr);
  });
};

export { registerUser, userLogin, listUser,updatedUser };

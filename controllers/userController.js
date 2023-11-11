import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const userLogin = async (req, res, next) => {
  const { user } = req;

  res.json({
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  });
};

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
export { registerUser, userLogin };

import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// Register User Endpoint

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    // Check if user exists
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }
    // Create new user
    const user = new User({ name, email, password });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save user
    await user.save();
    // Generate token
    const token = generateToken(user.id);
    // Send response
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
export { registerUser };

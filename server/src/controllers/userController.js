import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 🔐 Helper to generate a JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_TOKEN, { expiresIn: "10d" });
};

// ✅ SIGNUP Controller
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save new user
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    // 4. Generate token
    const token = generateToken(newUser._id);

    // 5. Send response
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ LOGIN Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 4. Generate token
    const token = generateToken(user._id);

    // 5. Send response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ LOGOUT Controller
export const logout = async (req, res) => {
  try {
    // If using cookie-based auth:
    // res.clearCookie("jwt");

    // For frontend-token based auth:
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get ALL USERS except current user
export const allUsers = async (req, res) => {
  try {
    const currentUserId = req.user.userId; // from auth middleware
    const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("AllUsers error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get CURRENT LOGGED-IN USER (For Auto-login)
export const getCurrentUser = async (req, res) => {
  try {
    console.log("REQ.USER in controller:", req.user); // Debug

    if (!req.user) return res.status(404).json({ error: "User not found controller" });

    // Optional DB refresh (not needed if user is already full)
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error controller" });
  }
};


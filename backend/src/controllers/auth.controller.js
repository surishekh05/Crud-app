import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";

// ---------------- REGISTER ----------------
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // Check if email already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return next(new ErrorResponse("Email already used", 400));
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({ name, email, password: hashed });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    next(err);
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 400));
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(new ErrorResponse("Wrong password", 400));
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    return res.json({
      success: true,
      token,
      message: "Login successful",
    });

  } catch (err) {
    next(err);
  }
};

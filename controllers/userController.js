import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Get all users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get user by ID

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Create new user

export const createUser = async (req, res) => {
  try {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists)
      return res.status(400).json({ message: "Email already in use" });

    const passwordHashed = await bcrypt.hash(req.body.passwordHash, 10);
    req.body.passwordHash = passwordHashed;

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

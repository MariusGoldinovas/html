import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

// POST to create a new user
router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure all fields are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required: name, email, password" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password (salt rounds set to 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

export default router;

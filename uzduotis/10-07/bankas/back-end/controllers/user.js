import Router from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

// Route to check session status
router.get("/session-status", checkAuth, (req, res) => {
  console.log(req.session.userId);
  if (req.session.userId) {
    res.json({ isLoggedIn: true });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout.");
    }
    res.clearCookie("connect.sid");
    res.sendStatus(200);
  });
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

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete User." });
  }
});

// controllers/user.js
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    req.session.userId = user._id;

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;

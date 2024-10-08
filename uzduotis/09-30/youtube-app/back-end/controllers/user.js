import { Router } from "express";
import User from "../models/user.js";
import { upload } from "../middleware/upload.js";
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

// Logout route to destroy the session
router.get("/api/user/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    // Clear the session cookie
    res.clearCookie("connect.sid", { path: "/" }); // Assuming `connect.sid` is your session cookie name
    res.status(200).json({ message: "Logged out successfully" });
  });
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

// Register a new user (with file uploads)
router.post(
  "/",
  upload.fields([
    { name: "userThumbnail", maxCount: 1 },
    { name: "coverPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          error: "Email already exists. Please use a different email.",
        });
      }

      if (
        !req.files ||
        !req.files["userThumbnail"] ||
        !req.files["coverPhoto"]
      ) {
        return res.status(400).json({
          error: "Both userThumbnail and coverPhoto must be uploaded.",
        });
      }

      req.body.userThumbnail = req.files["userThumbnail"][0].filename;
      req.body.coverPhoto = req.files["coverPhoto"][0].filename;

      try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      } catch (hashError) {
        return res.status(500).json({ error: "Error hashing password." });
      }

      const newUser = await User.create(req.body);

      res.status(201).json({
        data: newUser,
        message: "User successfully added",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Unable to create user." });
    }
  }
);

// PUT to update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      data: updatedUser,
      message: "User successfully updated",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to update user." });
  }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({
      message: "User successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.userId = user._id;
    res.json({
      message: "Logged in successfully",
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/me", (req, res) => {
  if (req.session && req.session.userId) {
    // Find the user in the database by their session ID
    User.findById(req.session.userId)
      .select("-password") // Do not return the password
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user); // Send back the user data if logged in
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    res.status(401).json({ message: "Unauthorized" }); // No active session found
  }
});

export default router;

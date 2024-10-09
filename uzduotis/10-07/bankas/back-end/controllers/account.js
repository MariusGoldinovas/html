import { Router } from "express";
import Account from "../models/account.js";
import { upload } from "../middleware/upload.js";
import {
  generateRandomAccountNumber,
  generateLithuanianIBAN,
  generateRandomBankCode,
} from "../helpers/iban.js";
import bcrypt from "bcrypt";
import { checkAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: "Unable to reach server" });
  }
});

// POST to create a new account with a random IBAN for Lithuania
router.post("/create", upload.single("idPhoto"), async (req, res) => {
  try {
    // Attach uploaded idPhoto filename to req.body
    req.body.idPhoto = req.file ? req.file.filename : null;

    // Generate a random 5-digit bank code
    const bankCode = generateRandomBankCode(); // Ensure the bank code is generated

    // Generate a random 11-digit account number
    const accountNumber = generateRandomAccountNumber();

    // Generate a valid IBAN for Lithuania (LT)
    const iban = generateLithuanianIBAN(bankCode, accountNumber); // Generate the IBAN

    // Add generated IBAN and account number to req.body
    req.body.iban = iban;
    req.body.accountNumber = accountNumber;
    req.body.bankCode = bankCode; // Ensure bankCode is added to the account

    // Create the account using the updated request body
    const account = await Account.create(req.body);

    // Send success response with all fields, including IBAN and bankCode
    res.status(201).json({
      message: "Account created successfully",
      data: account,
    });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedAccount = await Account.findByIdAndDelete(req.params.id);
    if (!deletedAccount) {
      return res.status(404).json({ error: "Account not found." });
    }
    res.json({
      message: "Account successfully deleted",
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete account." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update the account with the new data sent in req.body
      { new: true, runValidators: true } // Return the updated account
    );

    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    res.json({
      message: "Account successfully updated!",
      updatedAccount: account,
    });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Unable to update account." });
  }
});

router.put("/moneyRemove/:id", async (req, res) => {
  try {
    const { amount } = req.body;
    const account = await Account.findById(req.params.id);
    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    if (account.money < amount) {
      return res.status(400).json({ error: "Insufficient funds." });
    }

    account.money -= amount; // Assuming 'money' is the field for account balance
    await account.save();

    res.json({
      message: `Successfully removed ${amount} from account.`,
      updatedAccount: account,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to remove money from account." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const account = await Account.findOne({ email });
    if (!account) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, account.password); // Corrected variable reference
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Assuming you have session middleware configured
    req.session.userId = account._id; // Corrected variable reference

    res.json({ message: "Logged in successfully", userId: account._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

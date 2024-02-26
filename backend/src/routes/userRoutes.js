import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncMiddleware from "../middleware/async.js";

const router = express.Router();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

router.post(
  "/register",
  asyncMiddleware(async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const error = new Error("User already exists with this email.");
      error.status = 409;
      throw error;
    }

    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    const result = await user.save();
    res.send(result);
  })
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Email not found.");
    }
    if (user.password != password)
      return res.status(401).send("Invalid password.");
    res.send("Login Success!");
  } catch (error) {
    res.status(500).send("Error loggin in the user: " + error.message);
  }
});

export default router;

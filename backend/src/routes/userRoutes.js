import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashPassword(req.body.password),
    });

    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error creating the user: " + error.message);
  }
});

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

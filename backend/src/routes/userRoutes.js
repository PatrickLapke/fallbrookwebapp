import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error creating the user: " + error.message);
  }
});

export default router;

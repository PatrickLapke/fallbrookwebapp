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
      return res
        .status(409)
        .send({ message: "User already exists with this email." });
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

router.post(
  "/login",
  asyncMiddleware(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ message: "Email not found." });
    }
    if (!bcrypt.compare(password, user.password))
      return res.status(401).send({ message: "Password not found." });

    res.send({ message: "Login Success!" });
  })
);

export default router;

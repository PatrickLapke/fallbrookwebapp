import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect " + err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    const result = await user.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error creating the user: " + error.message);
  }
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

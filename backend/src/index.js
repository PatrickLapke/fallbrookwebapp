import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import error from "./middleware/error.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.use("/api/users", userRoutes);

app.use(error);

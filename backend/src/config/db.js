import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost/playground")
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.log("Could not connect: ", error);
  }
};

export default connectDB;

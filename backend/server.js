import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(
    "mongodb+srv://marinakim:UWNNX1kvnzx3ighn@catbytescluster.osj8oyj.mongodb.net/todo-db?retryWrites=true&w=majority&appName=CatBytesCluster"
  )
  .then(() => console.log("Connected!"));

// Schema
const UserSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
});

// Model
const User = mongoose.model("User", UserSchema);

// API route
app.get("/users", async (req, res) => {
  console.log("Getting all users from users table...");
  const todoItems = await User.find();
  console.log("Found items: ", todoItems);

  res.json(todoItems);
});

// API to create new user
app.post("/users", async (req, res) => {
  console.log("Creating new user...");
  const newItem = new User({
    name: "Alina",
    lastName: "CatBytes",
  });

  await newItem.save();
  res.json(newItem);
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

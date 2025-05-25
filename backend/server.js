require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect(
    `mongodb+srv://marinakim:${process.env.MONGO_DB_PASSWORD}@catbytescluster.osj8oyj.mongodb.net/todo-db?retryWrites=true&w=majority&appName=CatBytesCluster`
  )
  .then(() => console.log("Connected!"));

// Schema
const todoSchema = new Schema({
  item: String,
  isTaskComplete: Boolean,
  userId: String,
});

const userSchema = new Schema({
  email: String,
  hashedPassword: String,
})

// Model
const Todo = mongoose.model("Todo", todoSchema);
const User = mongoose.model("User", userSchema);

// API routes - CRUD operations

// create new item in database
app.post("/items", (req, res) => {
  const newItem = new Todo(req.body);
  newItem.save();

  res.json(newItem);
});

// get all items from database
app.get("/items", async (req, res) => {
  const userId = req.query.userId;

  await Todo.find({userId})
    .then((items) => {
      res.json(items);
    })
    .catch((err) => console.log(err));
});

// delete item from database
app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;

  await Todo.findByIdAndDelete(id)
    .then((deletedItem) => {
      res.json(deletedItem);
    })
    .catch((err) => console.log(err));
});

// update item in database
app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => console.log(err));
});

// API to register new users
app.post("/users", async (req, res) => {
  // getting email and hashedPassword from frontend
  const {email, hashedPassword} = req.body;

  if(!email || !hashedPassword) {
    return res.status(401).json({message: "Email and password are required"})
  }

  try {
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(401).json({message: "User with this email already exists"})
    }

    // if no existing user, need to create one
    const newUser = new User({
      email,
      hashedPassword
    })

    await newUser.save();

    return res.status(201).json({message: "User registered successfully"})
  } catch(err) {
    console.log(err);
  }
})

// API to login users
app.post("/login", async (req, res) => {
  const { email } = req.body;
  console.log("Email: ", email);
  const user = await User.findOne({email});
  console.log("User: ", user);
  
  if(!user) {
    return res.status(401).json({message: "User not found"});
  }

  res.status(200).json({
    hashedPassword: user.hashedPassword,
    userId: user._id
  })
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

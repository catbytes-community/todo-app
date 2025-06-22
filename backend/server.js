import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
import "dotenv/config";
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
import { pool } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

// // MongoDB Database connection
// mongoose
//   .connect(
//     `mongodb+srv://marinakim:${process.env.MONGO_DB_PASSWORD}@catbytescluster.osj8oyj.mongodb.net/todo-db?retryWrites=true&w=majority&appName=CatBytesCluster`
//   )
//   .then(() => console.log("Connected!"));

// // Schema
// const todoSchema = new Schema({
//   item: String,
//   isTaskComplete: Boolean,
//   userId: String,
// });

// const userSchema = new Schema({
//   email: String,
//   hashedPassword: String,
// })

// // Model
// const Todo = mongoose.model("Todo", todoSchema);
// const User = mongoose.model("User", userSchema);

// API routes - CRUD operations

// create new item in database
app.post("/items", async (req, res) => {
  // const newItem = new Todo(req.body);
  // newItem.save();

  // res.json(newItem);
  const { item, isTaskComplete, userId } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos (item, is_task_complete, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [item, isTaskComplete ?? false, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting todo:", err);
    res.status(500).json({ error: "Failed to create todo item" });
  }
});

// get all items from database
app.get("/items", async (req, res) => {
  const userId = req.query.userId;

  try {
    const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      userId,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ error: "Failed to fetch items" });
  }

  // await Todo.find({userId})
  //   .then((items) => {
  //     res.json(items);
  //   })
  //   .catch((err) => console.log(err));
});

// delete item from database
app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error deleting item: ", err);
    res.status(500).json({ error: "Failed to delete item" });
  }

  // await Todo.findByIdAndDelete(id)
  //   .then((deletedItem) => {
  //     res.json(deletedItem);
  //   })
  //   .catch((err) => console.log(err));
});

// update item in database
app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  const { item, isTaskComplete } = req.body;

  try {
    const result = await pool.query(
      "UPDATE todos SET item = $1, is_task_complete = $2 WHERE id = $3 RETURNING *",
      [item, isTaskComplete, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating item:", err);
    res.status(500).json({ error: "Failed to update item" });
  }

  // await Todo.findByIdAndUpdate(id, req.body, {
  //   new: true,
  // })
  //   .then((item) => {
  //     res.json(item);
  //   })
  //   .catch((err) => console.log(err));
});

// API to register new users
app.post("/users", async (req, res) => {
  // getting email and hashedPassword from frontend
  const { email, hashedPassword } = req.body;

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "Email and password are required" });
  }

  try {
    // const existingUser = await User.findOne({email});
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res
        .status(401)
        .json({ message: "User with this email already exists" });
    }

    // if no existing user, need to create one
    // const newUser = new User({
    //   email,
    //   hashedPassword
    // })

    // await newUser.save();

    await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

// API to login users
app.post("/login", async (req, res) => {
  const { email } = req.body;
  // const user = await User.findOne({email});
  try {
    const result = await pool.query(
      "SELECT id, email, hashed_password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];

    res.status(200).json({
      hashedPassword: user.hashed_password,
      userId: user.id,
    });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Login failed" });
  }

  // if(!user) {
  //   return res.status(401).json({message: "User not found"});
  // }

  // res.status(200).json({
  //   hashedPassword: user.hashedPassword,
  //   userId: user._id
  // })
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

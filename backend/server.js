require("dotenv").config();
const express = require("express");
const cors = require("cors");

// NoSQL imports
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// SQL imports
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(cors());

// NoSQL Database connection
// mongoose
//   .connect(
//     `mongodb+srv://marinakim:${process.env.MONGO_DB_PASSWORD}@catbytescluster.osj8oyj.mongodb.net/todo-db?retryWrites=true&w=majority&appName=CatBytesCluster`
//   )
//   .then(() => console.log("Connected!"));

// SQL Database connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// Schema
// const todoSchema = new Schema({
//   item: String,
//   isTaskComplete: Boolean,
//   userId: String,
// });

// const userSchema = new Schema({
//   email: String,
//   hashedPassword: String,
// });

// Model
// const Todo = mongoose.model("Todo", todoSchema);
// const User = mongoose.model("User", userSchema);

// API routes - CRUD operations

// create new item in database
app.post("/items", async (req, res) => {
  const { item, isTaskComplete, userId } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO todos (item, isTaskComplete, userId) VALUES ($1, $2, $3) RETURNING *",
      [item, isTaskComplete, userId]
    );

    console.log("Create todo result: ", result);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error creating item" });
  }
  // const newItem = new Todo(req.body);
  // newItem.save();

  // res.json(newItem);
});

// get all items from database
app.get("/items", async (req, res) => {
  const userId = req.query.userId;

  try {
    const result = await pool.query("SELECT * FROM todos WHERE userId = $1", [
      userId,
    ]);

    console.log("Get todo result: ", result);
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error reading item" });
  }

  // await Todo.find({ userId })
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

    res.json(result.rows[0]);
  } catch (err) {
    console.log("Delete todo error", err);
    res.status(400).json({ error: "Error deleting item" });
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
    let result;

    if (item !== undefined) {
      result = await pool.query(
        "UPDATE todos SET item = $1, isTaskComplete = $2 WHERE id = $3 RETURNING *",
        [item, isTaskComplete, id]
      );
    } else {
      result = await pool.query(
        "UPDATE todos SET isTaskComplete = $1 WHERE id = $2 RETURNING *",
        [isTaskComplete, id]
      );
    }

    console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    console.log("Update item error", err);
    res.status(400).json({ error: "Error updating table" });
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
    // const existingUser = await User.findOne({ email });
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
    await pool.query(
      "INSERT INTO users (email, hashedPassword) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    // const newUser = new User({
    //   email,
    //   hashedPassword,
    // });

    // await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error registering user" });
  }
});

// API to login users
app.post("/login", async (req, res) => {
  const { email } = req.body;
  // const user = await User.findOne({ email });

  try {
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("User in login route: ", user);

    res.status(200).json({
      hashedPassword: user.hashedpassword,
      userId: user.id,
    });
  } catch (err) {
    console.log("Login error: ", err);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

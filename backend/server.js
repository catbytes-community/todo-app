import "dotenv/config";
import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();

app.use(express.json());
app.use(cors());

// Database connection
// mongoose
//   .connect(
//     `mongodb+srv://marinakim:${process.env.MONGO_DB_PASSWORD}@catbytescluster.osj8oyj.mongodb.net/todo-db?retryWrites=true&w=majority&appName=CatBytesCluster`
//   )
//   .then(() => console.log("Connected!"));

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
  const { item, userId } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO todos (item, user_id) VALUES ($1, $2) RETURNING *",
      [item, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating a todo item: ", err);
    res.status(500).json({ error: "Error adding new item" });
  }
});

// // get all items from database
app.get("/items", async (req, res) => {
  const userId = req.query.userId;

  try {
    const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
      userId,
    ]);

    res.json(result.rows);
  } catch (err) {
    console.error("Error getting user items: ", err);
    res.status(500).json({ error: "Error getting user items" });
  }
});

// // delete item from database
app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error deleting a todo item", err);
    res.status(500).json({ error: err });
  }
});

// // update item in database
app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  const { item, isTaskComplete } = req.body;
  console.log("Update item:", item, isTaskComplete);

  try {
    const result = await pool.query(
      "UPDATE todos SET item = $1, is_task_complete = $2 WHERE id = $3 RETURNING *",
      [item, isTaskComplete, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating item: ", err);
    res.status(500).json({ error: err });
  }
});

// API to register new users
app.post("/users", async (req, res) => {
  // getting email and hashedPassword from frontend
  const { email, hashedPassword } = req.body;

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    console.log("existing user: ", existingUser);

    if (existingUser.rows.length > 0) {
      return res
        .status(401)
        .json({ message: "User with this email already exists" });
    }

    // if no existing user, need to create one
    await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

// // API to login users
app.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("Logged in user: ", user);

    res.status(200).json({
      hashedPassword: user.rows[0].hashed_password,
      userId: user.rows[0].id,
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(501).json({ error: err });
  }
});

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

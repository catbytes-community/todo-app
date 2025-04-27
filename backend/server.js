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
});

// Model
const Todo = mongoose.model("Todo", todoSchema);

// API routes - CRUD operations

// create new item in database
app.post("/items", (req, res) => {
  const newItem = new Todo(req.body);
  newItem.save();

  res.json(newItem);
});

// get all items from database
app.get("/items", async (req, res) => {
  await Todo.find()
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

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

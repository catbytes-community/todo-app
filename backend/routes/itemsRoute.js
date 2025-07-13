const express = require("express");
const router = express.Router();
const pool = require("../db/db");

// create new item in database
router.post("/", async (req, res) => {
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

// get all items from database
router.get("/", async (req, res) => {
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

// delete item from database
router.delete("/items/:id", async (req, res) => {
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

// update item in database
router.put("/items/:id", async (req, res) => {
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

module.exports = router;
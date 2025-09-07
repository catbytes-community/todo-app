const express = require("express");
const router = express.Router();
const knex = require("../db/db");

// create new item in database
router.post("/", async (req, res) => {
  const { item, userId } = req.body;

  try {
    const result = await knex("todos").insert({
        item,
        user_id: userId
    }).returning("*");

    res.status(201).json(result[0]);
  } catch (err) {
    console.error("Error creating a todo item: ", err);
    res.status(500).json({ error: "Error adding new item" });
  }
});

// get all items from database
router.get("/", async (req, res) => {
  const userId = req.query.userId;

  try {
    // const result = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
    //   userId,
    // ]);
    const result = await knex("todos").where({user_id: userId})

    res.json(result);
  } catch (err) {
    console.error("Error getting user items: ", err);
    res.status(500).json({ error: "Error getting user items" });
  }
});

// delete item from database
// API endpoint http://localhost:3001/items/:id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await knex("todos").where({id}).del().returning("*");
    res.json(result);
  } catch (err) {
    console.error("Error deleting a todo item", err);
    res.status(500).json({ error: err });
  }
});

// update item in database
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { item, isTaskComplete } = req.body;

  try {
    const result = await knex("todos").where({id}).update({
        item,
        is_task_complete: isTaskComplete
    }).returning("*");

    res.json(result);
  } catch (err) {
    console.error("Error updating item: ", err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;

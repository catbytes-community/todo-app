const express = require("express");
const router = express.Router();
const knex = require("../db/db.js");

router.post("/", async (req, res) => {
  // getting email and hashedPassword from frontend
  const { userId } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "userId is required" });
  }

  try {
    const existingUser = await knex("users").where({ id: userId }).first();

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User with this userId already exists" });
    }

    await knex
      .insert({ id: userId })
      .into("users");

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
});

// API to login users
// http://localhost:3001/users/login
router.post("/login", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await knex("users").where({email}).first();

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      hashedPassword: user.hashed_password,
      userId: user.id,
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(501).json({ error: err });
  }
});

module.exports = router;

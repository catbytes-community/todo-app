const express = require("express");
const router = express.Router();
const knex = require("../db/db.js");

router.post("/", async (req, res) => {
  // getting email and hashedPassword from frontend
  const { email, hashedPassword } = req.body;

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await knex("users").where({ email: email }).first();

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User with this email already exists" });
    }

    await knex
      .insert({ email: email, hashed_password: hashedPassword })
      .into("users");

    return res.status(201).json({ message: "User registered successfully" });
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

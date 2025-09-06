const express = require("express");
const router = express.Router();
const knex = require("../db/db.js");

router.post("/", async (req, res) => {
  // getting email and hashedPassword from frontend
  const { email, hashedPassword } = req.body;
  console.log("Email when registering", email);

  if (!email || !hashedPassword) {
    return res.status(401).json({ message: "Email and password are required" });
  }

  try {
    // const existingUser = await pool.query(
    //   "SELECT * FROM users WHERE email = $1",
    //   [email]
    // );
    const existingUser = await knex("users").where({ email: email }).first();
    console.log("existing user: ", existingUser);

    if (existingUser) {
      return res
        .status(401)
        .json({ message: "User with this email already exists" });
    }

    // if no existing user, need to create one
    // await pool.query(
    //   "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
    //   [email, hashedPassword]
    // );
    await knex
      .insert({ email: email, hashed_password: hashedPassword })
      .into("users");

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

// API to register new users
// router.post("/users", async (req, res) => {
//   // getting email and hashedPassword from frontend
//   const { email, hashedPassword } = req.body;

//   if (!email || !hashedPassword) {
//     return res.status(401).json({ message: "Email and password are required" });
//   }

//   try {
//     const existingUser = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email]
//     );
//     console.log("existing user: ", existingUser);

//     if (existingUser.rows.length > 0) {
//       return res
//         .status(401)
//         .json({ message: "User with this email already exists" });
//     }

//     // if no existing user, need to create one
//     await pool.query(
//       "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
//       [email, hashedPassword]
//     );

//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.log(err);
//   }
// });

// // API to login users
// // http://localhost:3001/users/login
// router.post("/login", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     if (user.rows.length === 0) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     console.log("Logged in user: ", user);

//     res.status(200).json({
//       hashedPassword: user.rows[0].hashed_password,
//       userId: user.rows[0].id,
//     });
//   } catch (err) {
//     console.error("Login error: ", err);
//     res.status(501).json({ error: err });
//   }
// });

module.exports = router;

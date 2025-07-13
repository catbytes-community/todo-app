require('dotenv').config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/", router);

// Server running
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

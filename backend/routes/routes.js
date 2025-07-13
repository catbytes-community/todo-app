const express = require("express");
const router = express.Router();
const usersRoute = require("./usersRoute");
const itemsRoute = require("./itemsRoute");

router.use("/users", usersRoute);
router.use("/items", itemsRoute);

module.exports = router;

const environment = "development";
const knexfile = require("./knexfile.js");
const config = knexfile[environment];
const knex = require("knex")(config);

module.exports = knex;

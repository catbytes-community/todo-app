// const pg = require("pg");
// const { Pool } = pg;

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });

// module.exports = pool;

const environment = "development";
const knexfile = require("./knexfile.js");
console.log("Knexfile:", knexfile);
const config = knexfile[environment];
console.log("config:", config);

const knex = require("knex")(config);

module.exports = knex;

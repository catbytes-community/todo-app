// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const path = require("path");

// stage, uat, test, demo, production, live
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "todo",
      user: "postgres",
      password: "manushka",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
      tableName: "knex_migrations",
    },
  },
};

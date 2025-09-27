/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists('todos')
    .dropTableIfExists('users')
    .createTable('users', (table) => {
        table.string('id').primary()
    })
    .createTable('todos', (table) => {
        table.increments('id').primary();
        table.string('item');
        table.boolean('is_task_complete').defaultTo(false);
        table.string('user_id').references('id').inTable('users');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('todos')
    .dropTableIfExists('users')
    .createTable('users', (table) => {
      table.increments("id").primary();
      table.string("email").unique().notNullable();
      table.string("hashed_password").notNullable();
    })
    .createTable('todos', (table) => {
      table.increments("id").primary();
      table.string("item").notNullable();
      table.boolean("is_task_complete").defaultTo(false);
      table.integer("user_id").references("id").inTable("users"); // foreign key
    })
};

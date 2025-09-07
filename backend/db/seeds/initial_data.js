const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del()
  await knex('users').del()
  await knex('users').insert([
    {id: 1, email: 'user1@gmail.com', hashed_password: bcrypt.hashSync("password1", bcrypt.genSaltSync(10))},
  ])
  await knex('todos').insert([
    {id: 1, item: 'study knex', is_task_complete: false, user_id: 1, comment: 'n/a', deadline: new Date()}
  ])
};

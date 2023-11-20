/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary(); 
        table.string('username').notNullable(); 
        table.string('email').notNullable(); 
        table.string('password_hash').notNullable(); 
        table.string('profile_picture_url');
        table.string('phone_number'); 
        table.string('mini_bio');
        table.timestamp('registration_date').defaultTo(knex.fn.now()); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};



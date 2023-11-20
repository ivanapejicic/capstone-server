/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('trips', (table) => {
        table.increments('trip_id').primary();
        table
            .integer('user_id')
            .unsigned()
            .references('user_id') 
            .inTable('users') 
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('start_location').notNullable();
        table.string('end_location').notNullable();
        table.dateTime('departure_time').notNullable();
        table.dateTime('return_time'); 
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('trips');
};

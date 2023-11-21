// In the new migration file (e.g., add_full_name_column.js)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table.string('full_name');  // Add the new column
        table.dropColumn('profile_picture_url');  // Remove the existing column
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('full_name');  // Reverse the changes in the 'up' function
        table.string('profile_picture_url');  // Add back the removed column
    });
};

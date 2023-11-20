exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('trips').del();

    // Seed new entries
    return knex('trips').insert([
        {
            user_id: 1, 
            start_location: '33139',
            end_location: '33133',
            departure_time: new Date('2023-11-20T09:00:00'), //9am
            return_time: new Date('2023-11-20T18:00:00'), //6pm
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            user_id: 4, 
            start_location: '33132',
            end_location: '33141',
            departure_time: new Date('2023-11-20T15:00:00'), //3pm
            return_time: new Date('2023-11-20T22:00:00'), //10pm
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
};
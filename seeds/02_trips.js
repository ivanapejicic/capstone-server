exports.seed = function (knex) {
    return knex('trips').del()
        .then(function () {
            return knex('trips').insert([
                {
                    user_id: 1,
                    start_location: '33173',
                    end_location: '33126',
                    departure_time: '12:00:00',
                    return_time: '16:00:00'
                },
                {
                    user_id: 2,
                    start_location: '33033',
                    end_location: '33122',
                    departure_time: '10:00:00',
                    return_time: '18:00:00'
                },
                {
                    user_id: 3,
                    start_location: '33134',
                    end_location: '33167',
                    departure_time: '08:00:00',
                    return_time: '12:00:00'
                },
                {
                    user_id: 1,
                    start_location: '33145',
                    end_location: '33161',
                    departure_time: '08:00:00',
                    return_time: '16:00:00'
                },
                {
                    user_id: 2,
                    start_location: '33130',
                    end_location: '33162',
                    departure_time: '11:00:00',
                    return_time: '17:00:00'
                },
                {
                    user_id: 6,
                    start_location: '33178',
                    end_location: '33141',
                    departure_time: '09:00:00',
                    return_time: '14:00:00'
                },
                {
                    user_id: 7,
                    start_location: '33172',
                    end_location: '33054',
                    departure_time: '13:00:00',
                    return_time: '21:00:00'
                },
                {
                    user_id: 3,
                    start_location: '33015',
                    end_location: '33147',
                    departure_time: '07:00:00',
                    return_time: '15:00:00'
                },
                {
                    user_id: 9,
                    start_location: '33129',
                    end_location: '33140',
                    departure_time: '10:00:00',
                    return_time: '19:00:00'
                },
                {
                    user_id: 6,
                    start_location: '33139',
                    end_location: '33132',
                    departure_time: '08:00:00',
                    return_time: '17:00:00'
                },
            ]);
        });
};

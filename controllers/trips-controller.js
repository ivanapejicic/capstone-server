const knex = require('knex')(require('../knexfile'));

const validateTripData = (data) => {
    const requiredFields = [
        'user_id',
        'start_location',
        'end_location',
        'departure_time',
        'return_time',
    ];

    for (const field of requiredFields) {
        if (!data[field]) {
            return {
                valid: false,
                message: `${field} is required.`,
            };
        }
    }

    return {
        valid: true,
    };
};

// const index = async (req, res) => {
//     try {

//         const usersFound = await knex("users")
//             .where({ id: req.params.id });

//         if (usersFound.length === 0) {
//             return res.status(404).json({
//                 message: `No user with ID ${req.params.id} found`,
//             });
//         }

//         const trips = await knex("users")
//             .join("trips", "users.id", "trips.user_id")
//             .where({ 'users.user_id': req.params.id })
//             .select('trips.trip_id', 'starting_zip', 'ending_zip', 'departure_time', 'return_time');

//         if (trips.length === 0) {
//             return res.status(200).json([{
//                 message: `No trips found for user with ID ${req.params.id}`,
//             }]);
//         }

//         res.json(trips);
//     } catch (error) {
//         res.status(500).json({
//             message: `Unable to retrieve trips for user with ID ${req.params.id}: ${error}`,
//         });
//     }
// };

const getAllTrips = async (_req, res) => {
    try {
        const allTrips = await knex("trips")
            .join("users", "trips.user_id", "users.user_id")  
            .select(
                'trips.trip_id',
                'trips.start_location',
                'trips.end_location',
                'trips.departure_time',
                'trips.return_time',
                'users.user_id'  
            );

        res.status(200).json(allTrips);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve all trips: ${error}`,
        });
    }
};

const findOne = async (req, res) => {
    try {
        const itemFound = await knex("trips")
            .join("users", "trips.user_id", "users.user_id")
            .where({ 'trips.trip_id': req.params.id })
            .select(
                'trips.trip_id',
                'trips.start_location',
                'trips.end_location',
                'trips.departure_time',
                'trips.return_time',
                'users.user_id' 
            );

        if (itemFound.length === 0) {
            return res.status(404).json({
                message: `Trip item with ID ${req.params.id} not found`
            });
        }

        const tripData = itemFound[0];
        res.json(tripData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve data for trip item with ID ${req.params.id}: ${error}`,
        });
    }
};

const update = async (req, res) => {
    try {
        const validation = validateTripData(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                message: validation.message,
            });
        }
        const rowsUpdated = await knex("trips").where({ trip_id: req.params.id }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(404).json({
                message: `Trip  with ID ${req.params.id} not found`,
            });
        }
        const updatedItem = await knex("trips").where({ trip_id: req.params.id }).first();
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({
            message: `Unable to edit trip  with ID ${req.params.id}: ${error}`,
        });
    }
};

const add = async (req, res) => {
    const validation = validateTripData(req.body);

    if (!validation.valid) {
        return res.status(400).json({
            message: validation.message,
        });
    }

    try {
        const result = await knex('trips').insert(req.body);

        const newTripId = result[0];
        const createdItem = await knex('trips').where({ trip_id: newTripId }).first();

        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create new trip: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    try {
        const rowsDeleted = await knex("trips")
            .where({ trip_id: req.params.id })
            .delete();

        if (rowsDeleted === 0) {
            return res
                .status(404)
                .json({ message: `Trip item with ID ${req.params.id} not found` });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete trip item: ${error}`
        });
    }
};

module.exports = {
    getAllTrips,
    // index,
    findOne,
    update,
    add,
    remove
};
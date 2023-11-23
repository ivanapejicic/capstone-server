const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips-controller');


router
    .route('/')
    .get(tripsController.getAllTrips)
    .post(tripsController.add);

// router
//     .route('/:id/trips')
//     .get(tripsController.index);


router
    .route('/:id')
    .get(tripsController.findOne)
    .put(tripsController.update)
    .delete(tripsController.remove); 



module.exports = router;

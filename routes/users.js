const router = require('express').Router();
const usersController = require('../controllers/users-controller');

router
    .route('/users')
    .post(usersController.add);

router.route('users/:id')
    .get(usersController.findOne)
    .put(usersController.update)
    .delete(usersController.remove);

module.exports = router;


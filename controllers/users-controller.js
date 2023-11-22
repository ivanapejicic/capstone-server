const knex = require('knex')(require('../knexfile'));
const bcrypt = require('bcrypt');

const index = async (_req, res) => {
    try {
        const data = await knex('users');
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send(`Error retrieving users: ${err}`);
    }
};

const findOne = async (req, res) => {
    try {
        const userFound = await knex("users").where({ user_id: req.params.id });

        if (!userFound || userFound.length === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const userData = userFound[0];
        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: `Unable to retrieve user data for user with ID ${req.params.id}`,
        });
    }
};

const update = async (req, res) => {
    try {
        const rowsUpdated = await knex("users").where({ user_id: req.params.id }).update(req.body);

        if (rowsUpdated === 0) {
            return res.status(500).json({
                message: `Unable to update user with ID ${req.params.id}`
            });
        }

        const updatedUser = await knex("users").where({ user_id: req.params.id });
        res.json(updatedUser[0]);
    } catch (error) {
        res.status(500).json({
            message: `Unable to update user with ID ${req.params.id}: ${error}`
        });
    }
};

const add = async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Please fill all necessary info for your profile",
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password_hash = hashedPassword;
        delete req.body.password; 

        const result = await knex("users").insert(req.body);

        const newUserId = result[0];
        const createdUser = await knex("users").where({ user_id: newUserId });

        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({
            message: `Unable to create your account: ${error}`,
        });
    }
};

const remove = async (req, res) => {
    try {
        const userFound = await knex("users").where({ user_id: req.params.id });

        if (!userFound || userFound.length === 0) {
            return res.status(404).json({
                message: `User with ID ${req.params.id} not found`
            });
        }

        const rowsDeleted = await knex("users").where({ user_id: req.params.id }).del();

        if (rowsDeleted === 0) {
            return res.status(500).json({
                message: `Unable to delete user with ID ${req.params.id}`
            });
        }

        res.json({
            message: `User with ID ${req.params.id} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete user with ID ${req.params.id}: ${error}`
        });
    }
};

module.exports = {
    index,
    findOne,
    update,
    add,
    remove
};

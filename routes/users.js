const router = require('express').Router();
const usersController = require('../controllers/users-controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authorize = require('../middleware/authorize');
const knex = require('knex')(require('../knexfile'));


// router
//     .route('/')
//     .get(usersController.index)
//     .post(usersController.add);

// router.route('/:id')
//     .get(usersController.findOne)
//     .put(usersController.update)
//     .delete(usersController.remove);

router.post("/register", async (req, res) => {
    const { username, email, password, full_name, mini_bio, phone_number } = req.body;
    if (!username || !email || !password || !full_name || !mini_bio || !phone_number) {
        return res.status(400).json({ error: "Please enter the required fields." });
    }
    const hashedPassword = bcrypt.hashSync(password);

    // Create the new user
    const newUser = {
        username,
        email,
        full_name,
        mini_bio,
        phone_number,
        password_hash: hashedPassword
    };

    // Insert it into our database
    try {
        await knex('users').insert(newUser);
        res.status(201).send("Registered successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("Failed registration");
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send("Please enter the required fields");
    }

    const user = await knex('users').where({ username: username }).first();
    if (!user) {
        return res.status(400).send("Invalid username");
    }

    const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordCorrect) {
        return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
        { user_id: user.user_id, username: user.username },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
    );

    res.json({ token });
});

router.get('/current', async (req, res) => {
	if(!req.headers.authorization) {
		return res.status(401).send('Please login')
	}

	const authHeader = req.headers.authorization;
	const authToken = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(authToken, process.env.JWT_KEY)

		const user = await knex('users').where({user_id: decoded.user_id}).first();
		delete user.password;
		res.json(user)

	} catch(error) {
		return res.status(401).send("Invalid auth token");
	}
})

router.get("/", authorize, async (_req, res) => {

    try {
        const users = await knex
            .select("*")
            .from("users")
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve users data" });
    }
})

module.exports = router;

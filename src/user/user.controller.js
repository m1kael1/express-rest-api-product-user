const express = require("express");
const { hash } = require("bcrypt");
const {
	getAllUser,
	getUserById,
	createUser,
	deleteUserById,
} = require("./user.service");

const router = express.Router();

router.get("/", async (req, res) => {
	const users = await getAllUser();
	res.status(200).send(users);
});

router.post("/", async (req, res) => {
	try {
		const newUserData = req.body;
		newUserData.password = await hash(newUserData.password, 12);
		const user = await createUser(newUserData);
		res.status(201).send({ message: "User created", user });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await getUserById(userId);
		res.status(200).send(user);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		await deleteUserById(userId);
		res.status(200).send("User deleted");
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;

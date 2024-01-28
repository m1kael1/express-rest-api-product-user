const { deleteProductByOwnerId } = require("../product/product.repository");
const {
	findUsers,
	findUserById,
	findUserByEmail,
	insertUser,
	deleteUser,
} = require("./user.repository");

const getAllUser = async () => {
	const users = await findUsers();
	return users;
};

const getUserById = async (userId) => {
	const user = await findUserById(userId);
	if (!user) {
		throw Error("User not found");
	}
	return user;
};

const getUserByEmail = async (email) => {
	const user = await findUserByEmail(email);
	if (user) {
		throw Error("Email already in use");
	}
	return user;
};

const createUser = async (newUserData) => {
	await getUserByEmail(newUserData.email);
	const user = await insertUser(newUserData);
	return user;
};

const deleteUserById = async (userId) => {
	const user = await getUserById(userId);
	if (user.products.length >= 1) {
		await deleteProductByOwnerId(userId);
	}
	await deleteUser(userId);
};

module.exports = {
	getAllUser,
	getUserById,
	getUserByEmail,
	createUser,
	deleteUserById,
};

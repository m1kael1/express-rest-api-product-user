const prisma = require("../db");

const findUsers = async () => {
	const users = await prisma.user.findMany();
	return users;
};

const findUserById = async (userId) => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			products: true,
		},
	});
	return user;
};

const findUserByEmail = async (email) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	return user;
};

const insertUser = async (newUserData) => {
	const user = await prisma.user.create({
		data: newUserData,
	});

	return user;
};

const deleteUser = async (userId) => {
	const user = await prisma.user.delete({
		where: {
			id: userId,
		},
	});

	return user;
};

module.exports = {
	findUsers,
	findUserById,
	findUserByEmail,
	insertUser,
	deleteUser,
};

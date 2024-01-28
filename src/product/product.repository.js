const prisma = require("../db");

const findProducts = async () => {
	const products = await prisma.product.findMany();

	return products;
};

const findProductById = async (productId) => {
	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});

	return product;
};

const insertProduct = async (newProductData) => {
	const product = await prisma.product.create({
		data: newProductData,
	});

	return product;
};

const deleteProduct = async (productId) => {
	await prisma.product.delete({
		where: {
			id: productId,
		},
	});
};

const deleteProductByOwnerId = async (ownerId) => {
	await prisma.product.deleteMany({
		where: {
			ownerId,
		},
	});
};

const editProduct = async (productId, productData) => {
	const product = await prisma.product.update({
		where: {
			id: productId,
		},
		data: productData,
	});

	return product;
};

module.exports = {
	findProducts,
	findProductById,
	insertProduct,
	deleteProduct,
	editProduct,
	deleteProductByOwnerId,
};

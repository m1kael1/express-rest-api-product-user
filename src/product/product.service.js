const { getUserById } = require("../user/user.service");
const {
	findProducts,
	findProductById,
	insertProduct,
	editProduct,
	deleteProduct,
} = require("./product.repository");

const getAllPorduct = async () => {
	const products = await findProducts();
	return products;
};

const getProductById = async (productId) => {
	const product = await findProductById(productId);
	if (!product) {
		throw Error("Product not found");
	}
	return product;
};

const createProduct = async (newProductData) => {
	await getUserById(newProductData.ownerId);
	const product = await insertProduct(newProductData);
	return product;
};

const deleteProductById = async (productId) => {
	await getProductById(productId);
	await deleteProduct(productId);
};

const editProductById = async (productId, productData) => {
	await getProductById(productId);
	const product = await editProduct(productId, productData);
	return product;
};

module.exports = {
	getAllPorduct,
	getProductById,
	createProduct,
	deleteProductById,
	editProductById,
};

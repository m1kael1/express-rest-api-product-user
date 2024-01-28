const express = require("express");
const {
	getAllPorduct,
	getProductById,
	createProduct,
	deleteProductById,
	editProductById,
} = require("./product.service");

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await getAllPorduct();
	res.status(200).send(products);
});

router.get("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await getProductById(productId);
		res.status(200).send(product);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const newProductData = req.body;
		const product = await createProduct(newProductData);
		res.status(201).send({ message: "Product created", product });
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		await deleteProductById(productId);
		res.status(200).send("Product deleted");
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const productData = req.body;
		const product = await editProductById(productId, productData);
		res.status(200).send({
			message: "Product edited",
			data: product,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const productData = req.body;
		if (
			!(
				productData.imageUrl &&
				productData.stock &&
				productData.name &&
				productData.description &&
				productData.price
			)
		) {
			throw Error("Some fields are missing");
		}
		const product = await editProductById(productId, productData);
		res.status(200).send({
			message: "Product edited",
			data: product,
		});
	} catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;

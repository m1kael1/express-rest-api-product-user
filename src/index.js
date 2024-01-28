const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productController = require("./product/product.controller");
const userController = require("./user/user.controller");
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/api/products", productController);
app.use("/api/users", userController);

app.get("/api", (req, res) => {
	res.send("API Ready");
});
app.listen(PORT, () => {
	console.log("API running in port : " + PORT);
});

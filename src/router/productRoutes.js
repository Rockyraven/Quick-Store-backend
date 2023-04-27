const express = require("express");
const getProduct = require("../controller/ProductController");

const productRouter = express.Router();

productRouter.get("/", getProduct);

module.exports = productRouter;
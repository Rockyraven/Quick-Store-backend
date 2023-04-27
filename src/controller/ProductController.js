const express = require("express");
const productModel = require("../model/productModel");

const getProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "something went wrong"});
    }
}

module.exports = getProduct;
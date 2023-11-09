const express = require('express');
const cartModel = require("../model/cartModel");
const productModel = require('../model/productModel');

const getCart =  async(req, res) => {
    try {
        const cart = await cartModel
        .where("userId")
        .equals(req.userId)
        .populate("product");
    
      res.status(200).json(cart);
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ messgae: "something went wrong" });
      }
}
const createCart = async (req, res) => {
    const userId = req.userId;
    const productId = req.params.productId;
    try {
        const product = await productModel.findById(productId);
        if(!product) throw {error: "there is no product"};
        
        // const existProduct = await wishlistModel.findOne({productId: productId});
        const existProduct = await cartModel.findOne({product: productId});
        if(existProduct){
            return res.status(400).json({messgae: "user Already exist"});
        }
        const cart = await cartModel.create({
            product: productId,
            userId: userId,
        })
        if(!cart) {
            throw { error: "Some went wrong"};
        }
        res.status(200).json({messgae: "cart created successfully", cart});
    } catch (error) {
        console.log(error);
        res.status(404).json({messgae: "Something went wrong"})
    }
}

const deleteCart = async (req, res) => {
    const productId = req.params.productId;
    try{
        const wishListId = await cartModel.findOne({product :{ _id : productId}});
        const existProduct = await cartModel.findByIdAndRemove(wishListId._id);
        res.status(202).json({messgae: "Cart Deleted Successfully" ,existProduct});
    }
    catch(error){
        console.log(error);
        res.status(500).json({messgae: "something went wrong"});
    }
}

module.exports = {getCart, createCart, deleteCart}

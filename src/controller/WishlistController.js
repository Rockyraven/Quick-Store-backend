const express = require("express");
const productModel = require("../model/productModel");
const wishlistModel = require("../model/wishlistModel");
const cartModel = require("../model/cartModel");


const getWishlist = async (req, res) => {
    try {
        const wishlist = await wishlistModel
        .where("userId")
        .equals(req.userId)
        .populate("product");
    
      res.status(200).json(wishlist);
    
      } catch (error) {
        console.log(error);
        res.status(500).json({ messgae: "something went wrong" });
      }
}

const createWishlist = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    try {
        const product = await productModel.findById(productId);
        if(!product) throw {error: "there is no product"}
        const existProduct = await wishlistModel.findOne({product :{ _id : productId}});
        if(existProduct){
            return res.status(400).json({messgae: "user Already exist"});
        }
        const wishList = await wishlistModel.create({
            product: productId,
            userId: userId,
        })
        if(!wishList) {
            throw { error: "Some went wrong"};
        }
        res.status(200).json({messgae: "wishlist created successfully", wishList});
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae: "something went wrong"})
    }    
}


const createWishlistToCart = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    try {
        const product = await wishlistModel.findOne({product :{ _id : productId}});
        if(!product){
            throw {error: "there is no product"}
        } 
        const existProduct = await cartModel.findOne({product :{ _id : productId}});
        if(existProduct){
            return res.status(400).json({messgae: "Product Already exist"});
        }
        const wishList = await cartModel.create({
            product: product.product,
            userId: userId
        })
        if(!wishList){
            throw {error :" Something went wrong"};
        }
        console.log(wishList, product, existProduct);
        res.status(200).json({messgae: "WishList to Cart Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({messgae: "something went wrong"})
    }
}


const deleteWishList = async (req, res) => {
    const productId = req.params.productId;
    try{
        const wishListId = await wishlistModel.findOne({product :{ _id : productId}});
        const existProduct = await wishlistModel.findByIdAndRemove(wishListId._id);
        res.status(202).json({messgae: "WishList Deleted Successfully" ,existProduct});
    }
    catch(error){
        console.log(error);
        res.status(500).json({messgae: "something went wrong"});
    }
}


module.exports = {getWishlist, createWishlist, deleteWishList, createWishlistToCart};



/*
getWishList
deleteWishList
getCart
delete cart
wishList to cart
*/

const express = require("express");
const getWishlist = require("../controller/WishlistController");
const wishlistRouter = express.Router();

// wishlistRouter.get("/wishlist", getWishlist);
wishlistRouter.post("/wishlist", getWishlist.createWishlist)

module.exports = wishlistRouter ;

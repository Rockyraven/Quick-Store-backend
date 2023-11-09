const express = require("express");
const { getWishlist, createWishlist, deleteWishList, createWishlistToCart } = require("../controller/WishlistController");
const auth = require("../middleware/auth");
const wishlistRouter = express.Router();

wishlistRouter.get("/wishlist", auth, getWishlist);
wishlistRouter.post("/wishlistToCart/:productId", auth, createWishlistToCart);
wishlistRouter.post("/wishlist/:productId", auth, createWishlist);
wishlistRouter.delete("/wishlist/:productId", auth, deleteWishList);

module.exports = wishlistRouter ;

const mongoose = require("mongoose");
const productModel = require("./productModel");
const userModel = require("./userModel");

const wishlistSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: productModel,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: userModel,
      },
}, {timestamps: true}) 

module.exports = mongoose.model("wishlist", wishlistSchema)
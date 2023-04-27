const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    image: {
        type: String,
        default: "",
    },
    categoryName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    actualPrice: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required:true
    }
    
}, {timestamps: true}) 

module.exports = mongoose.model("Product", ProductSchema)
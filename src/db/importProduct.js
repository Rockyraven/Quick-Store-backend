const mongoose = require('mongoose'); 
// const videoModel = require('../model/videoModel');
const productModel = require("../model/productModel")
const videos = require("./video");



mongoose.connect("mongodb+srv://store:store@cluster0.p6poid7.mongodb.net/?retryWrites=true&w=majority")
.then(() => {  
    console.log("database connected ");
})
.catch((error) => {
    console.log(error);
})

const importProduct = async() => {
    try {
        await productModel.create(videos);
        console.log("video uploaded")
    } catch (error) {
        console.log(error)
    }
}
importProduct();


const express = require('express');
const auth = require('../middleware/auth');
const { getCart, createCart, deleteCart } = require('../controller/CartController');
const cartRouter = express.Router();

cartRouter.get('/cart', auth, getCart);
cartRouter.post('/cart/:productId', auth, createCart);
cartRouter.delete('/cart/:productId', auth, deleteCart);

module.exports = cartRouter;

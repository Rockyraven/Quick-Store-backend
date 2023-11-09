const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./router/productRoutes");
const userRouter = require("./router/userRoutes");
const wishlistRouter = require("./router/wishlistRoutes");
const cartRouter = require("./router/cartRoutes")

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/", productRouter);
app.use("/", wishlistRouter);
app.use("/", cartRouter);

app.get('/', (req, res) => {
    res.send("hello world");
})

mongoose
  .connect(
    "mongodb+srv://store:store@cluster0.p6poid7.mongodb.net/"
  )
  .then(() => {
    console.log("database connected ");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen('5000', () => {
    console.log("server is started");
})
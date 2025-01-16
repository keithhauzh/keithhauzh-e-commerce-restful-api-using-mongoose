// dotenv
require("dotenv").config();

// import express
const express = require("express");

// import cors
const cors = require("cors");

// import mongoose
const mongoose = require("mongoose");

// create the express app
const app = express();

// middleware to handle JSON request (body)
app.use(express.json());

// setup cors policy
app.use(cors());

// set a folder as a static path
app.use("/api/uploads", express.static("uploads"));

// connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL + "/ecommerce")
  .then(() => {
    // if mongodbb is successfully connected
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// root route
app.get("/api", (req, res) => {
  res.send("Happy Coding!");
});

// import all the routes
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");

// define urls for routers
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/auth", userRouter);
app.use("/api/image", imageRouter);

// start the server
app.listen(5555, () => {
  console.log("Server is running at http://localhost:5555");
});

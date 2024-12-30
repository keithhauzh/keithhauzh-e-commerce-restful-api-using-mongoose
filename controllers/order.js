// require axios to call billplz api
const axios = require("axios");

// import the Order model
const Order = require("../models/order");
const Product = require("../models/product");

// get all the orders
const getOrders = async () => {
  const orders = await Order.find();
  return orders;
};

// get one order
const getOrder = async () => {};

// add new order
const addNewOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrices
) => {
  // 1. create a bill in billplz
  const billplzResponse = await axios.post(
    "https://www.billplz-sandbox.com/api/v3/bills", // api
    {
      collection_id: process.env.BILLPLZ_COLLECTION_ID,
      description: "Payment for My Store",
      name: customerName,
      email: customerEmail,
      // parseFloat will convert string to float number
      amount: parseFloat(totalPrices) * 100,
      callback_url: "http://localhost:3000/verify-payment",
      redirect_url: "http://localhost:3000/verify-payment",
    },
    {
      auth: {
        username: process.env.BILLPLZ_SECRET_KEY,
        password: "",
      },
    }
  );

  // 2. retrieve the billplz_url and billplz_id from the api
  const billplz_id = billplzResponse.data.id;
  const billplz_url = billplzResponse.data.url;

  // 3. create a new order (put in the billplz_id into the order)
  const newOrder = new Order({
    customerName,
    customerEmail,
    products,
    totalPrices,
    billplz_id,
  });
  await newOrder.save();

  // 4. return thee new order with the billplz_url
  return {
    ...newOrder,
    billplz_url,
  };
};

// update order
const updateOrder = async (id, orderStatus) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status: orderStatus },
    { new: true }
  );
  return updatedOrder;
};

// delete order
const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
};

// schema for order collection
const { Schema, model } = require("mongoose");

// setup the order schema
const orderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: false },
  products: { type: Array, required: true },
  totalPrices: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    default: "failed",
    enum: ["pending", "paid", "failed", "completed"], // enum limits the value that can be stored to provided options only
  },
  billplz_id: String, // the ID from the bill in billplz
  paid_at: Date,
});

const Order = model("Order", orderSchema);
module.exports = Order;

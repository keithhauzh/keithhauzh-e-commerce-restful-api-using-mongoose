// schema for products collection
const { Schema, model } = require("mongoose");

// setup the products
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

// convver the schemam to a model
const Product = model("Product", productSchema);

// equal to "export default Product" in React
module.exports = Product;

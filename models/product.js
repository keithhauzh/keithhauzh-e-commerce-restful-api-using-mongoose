// schema for products collection
const { Schema, model } = require("mongoose");

// setup the products
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  // linkage between the products and categories (Similar to SQL foreign key)
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  image: String,
});

// convver the schemam to a model
const Product = model("Product", productSchema);

// equal to "export default Product" in React
module.exports = Product;

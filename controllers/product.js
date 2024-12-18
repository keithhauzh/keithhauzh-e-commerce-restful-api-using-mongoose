const Product = require("../models/product");

// CRUD functions
// get all products
const getProducts = async (category, page = 1, per_page = 6) => {
  let filter = {};
  // if genre exists, pass it to the filter container
  if (category && category !== "all") {
    filter.category = category;
  }

  // apply filter in .find();
  const products = await Product.find(filter)
    .limit(per_page)
    .skip((page - 1) * per_page)
    .sort({ _id: -1 });
  return products;
};

// get one product
const getProduct = async (id) => {
  const product = await Product.findById(id);
  return product;
};

const addNewProduct = async (name, description, price, category) => {
  // create new product
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  // save the new product into mongodb
  await newProduct.save();
  return newProduct;
};

// update product
const updateProduct = async (id, name, description, price, category) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, price, category },
    // return back the new data
    { new: true }
  );
  return updatedProduct;
};

// delete product
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};

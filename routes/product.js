const express = require("express");
// create a routuer for products
const router = express.Router();

// import functions from controller
const {
  getProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// create the routes
// get all the products. Pointing to /movies
router.get("/", async (req, res) => {
  try {
    // use the getProducts from the controller to load it
    const category = req.query.category;
    const products = await getProducts(category);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

// add product
router.post("/", async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // check for error
    if (!name || !description || !price || !category) {
      {
        return res.status(400).send({ error: "Required data is missing :(" });
      }
    }

    // pass in all the data to addNewProduct functiion
    const newProduct = await addNewProduct(name, description, price, category);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error._message });
  }
});

// update product
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;

    // pass in the data into the updateProduct function
    const updatedProduct = await updateProduct(
      id,
      name,
      description,
      price,
      category
    );

    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// delete product
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // trigger the deleteProduct function
    await deleteProduct(id);
    res.status(200).send({
      message: `Movie with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

module.exports = router;

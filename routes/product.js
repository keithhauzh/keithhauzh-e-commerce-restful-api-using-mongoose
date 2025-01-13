const express = require("express");
// create a routuer for products
const router = express.Router();

// authentication middleware
const { isAdmin } = require("../middleware/auth");

// import functions from product controller
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
    const page = req.query.page;
    const per_page = req.query.per_page;

    const products = await getProducts(category, page, per_page);

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// get one product by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProduct(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send("Product not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

// add product
router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;

    // check for error
    if (!name || !description || !price || !category) {
      {
        return res.status(400).send({ error: "Required data is missing :(" });
      }
    }

    // pass in all the data to addNewProduct functiion
    const newProduct = await addNewProduct(name, description, price, category, image);
    res.status(200).send(newProduct);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// update product
router.put("/:id", isAdmin, async (req, res) => {
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
      error: error.message,
    });
  }
});

// delete product
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    // if (!id) {
    //   return res.status(400).send("Product with requested id was not found");
    // }

    // trigger the deleteProduct function
    await deleteProduct(id);
    res.status(200).send({
      message: `Movie with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
});

module.exports = router;

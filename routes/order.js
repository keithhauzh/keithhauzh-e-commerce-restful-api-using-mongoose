const express = require("express");

// set up the order router
const router = express.Router();

// import all the order functions
const {
  getOrders,
  getOrder,
  addNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

/* 
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders/:id
    DELETE /orders/:id
*/

// create new order
router.post("/", async (req, res) => {
  try {
    // get data
    const {
      customerName = "",
      customerEmail = "",
      products = [],
      totalPrices = 0,
    } = req.body;

    // trigger function from controller to create data
    const newOrder = await addNewOrder(
      customerName,
      customerEmail,
      products,
      totalPrices
    );

    // submit data
    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error._message,
    });
  }
});

// get orders
router.get("/", async (req, res) => {
  try {
    // trigger function from controller
    const orders = await getOrders();
    // send
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({
      error: error._message,
    });
  }
});

// update orders
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const orderStatus = req.body.status;

    // pass in the data into the updateOrder function
    const updatedOrder = await updateOrder(id, orderStatus);
    res.status(200).send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error.message,
    });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // trigger the deleteOrder function
    await deleteOrder(id);
    res.status(200).send({
      message: `Order with the provided id #${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error._message });
  }
});

module.exports = router;

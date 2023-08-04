const router = require("express").Router();
const Order_customerController = require("../controller/order_customer.controller.js");
const order_customerController = new Order_customerController();

router
  .route("/")
  .post(order_customerController.createOrder)

  router
  .route("/:customerId")
  .put(order_customerController.completeOrder)

  
module.exports = router;
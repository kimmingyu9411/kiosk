const router = require("express").Router();
const Item_order_customer_Controller = require("../controller/item_order_customer.controller.js");
const item_order_customer_Controller = new Item_order_customer_Controller();

router
  .route("/:customerId")
  .post(item_order_customer_Controller.itemOrders)
  .get(item_order_customer_Controller.getOrders)



module.exports = router;
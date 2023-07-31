const router = require("express").Router();
const auth = require("../middleware/auth.js");
const Order_itemController = require("../controller/order_item.controller.js");
const order_itemController = new Order_itemController();

router
  .route("/")
  .get(auth, order_itemController.checkOrder);

router
  .route("/:itemId")
  .post(auth, order_itemController.createOrderItem)

router
  .route("/changeState/:order_itemId")
  .put(auth, order_itemController.changeState)

module.exports = router;

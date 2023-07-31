const router = require("express").Router();
const auth = require("../middleware/auth.js");
const ItemController = require("../controller/item.controller.js");
const itemController = new ItemController();

router
  .route("/")
  .post(auth, itemController.createItem)
  .get(auth, itemController.getAllItem);

router
  .route("/:itemId")
  .put(auth, itemController.updateItem)
  .delete(auth, itemController.deleteItem)

router
  .route("/:itemId/redelete")
  .delete(auth, itemController.reDeleteItem)

module.exports = router;
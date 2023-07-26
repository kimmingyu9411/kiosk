const router = require("express").Router();
const auth = require("../middleware/auth.js");
const ItemController = require("../controller/item.controller.js");
const itemController = new ItemController();

router
  .route("/")
  .post(auth, itemController.createItem);

module.exports = router;
const router = require("express").Router();
const OptionController = require("../controller/option.controller");
const optionController = new OptionController();

router
  .route("/")
  .post(optionController.createOption)
  .get(optionController.viewOption)

  router
  .route("/:optionId")
  .put(optionController.updateOption)
  .delete(optionController.deleteOption)
module.exports = router;

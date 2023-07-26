const itemService = require("../service/item.service.js");

class ItemController {
  constructor() {
    this.itemService = new itemService();
  }
  createItem = async (req, res, next) => {
    const user = res.locals.user;
    const { name, price, type, amount } = req.body;

    const createdItem = await this.itemService.createItem(
      user,
      name,
      price,
      type
    );
    if (createdItem.status === 400) {
      return res.status(400).json({ errorMessage: createdItem.errorMessage });
    } else {
      return res.status(200).json({ message: createdItem.message });
    }
  };
  getAllItem = async (req, res, next) => {
    const getAllItem = await this.itemService.getAllItem();
    if (getAllItem.status === 400) {
      return await res
        .status(400)
        .json({ errorMessage: getAllItem.errorMessage });
    } else {
      return await res.status(200).json({ data: getAllItem.getAllItem });
    }
  };
  updateItem = async (req, res, next) => {
    const { itemId } = req.params;
    const user = res.locals.user;
    const { name, price, type, password } = req.body;
    const updateItem = await this.itemService.updateItem(
      itemId,
      user,
      name,
      price,
      type,
      password
    );
    if (updateItem.status === 400) {
      res.status(400).json({
        errorMessage: updateItem.errorMessage,
      });
    } else {
      res.status(200).json({ message: updateItem.message });
    }
  };

  deleteItem = async (req, res, next) => {
    const itemId = req.params;
    const user = res.locals.user;
    const { password } = req.body;

    const deleteItem = await this.itemService.deleteItem(
      itemId,
      user,
      password
    );
    if (deleteItem.status === 400) {
      res.status(400).json({
        errorMessage: deleteItem.errorMessage,
      });
    } else {
      res.status(200).json({ message: deleteItem.message });
    }
  };
}

module.exports = ItemController;

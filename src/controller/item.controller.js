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
      type,
      amount
    );
    if (createdItem.status === 400) {
      res.status(400).json({ errorMessage: createdItem.errorMessage });
    } else {
      res.status(200).json({ message: createdItem.message });
    }
  };
}
module.exports = ItemController;

const Order_cutomerService = require("../service/order_cutomer.service.js");

class Order_cutomerController {
  constructor() {
    this.order_cutomerService = new Order_cutomerService();
  }

  createOrder = async (req, res, next) => {
    const itemId = req.body;

    const createOrder = await this.Order_cutomerService.createOrder(itemId);

    if (createOrder.status === 400) {
      return res.status(400).json({ errorMessage: createOrder.errorMessage });
    } else {
      return res.status(200).json({ message: createOrder.message });
    }
  };
}

module.exports = Order_cutomerController;

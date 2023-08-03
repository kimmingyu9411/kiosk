const Order_customerService = require("../service/order_customer.service.js");

class Order_customerController {
  constructor() {
    this.order_customerService = new Order_customerService();
  }

  createOrder = async (req, res, next) => {
    const createOrder = await this.order_customerService.createOrder();

    if (createOrder.status === 400) {
      return res.status(400).json({ errorMessage: createOrder.errorMessage });
    } else {
      return res.status(200).json({ message: createOrder.message });
    }
  };

  completeOrder = async (req, res, next) => {
    const { customerId } = req.params;
    const {state}=req.body

    const completeOrder = await this.order_customerService.completeOrder(customerId,state);

    if (completeOrder.status === 400) {
      return res.status(400).json({ errorMessage: completeOrder.errorMessage });
    } else {
      return res.status(200).json({ message: completeOrder.message });
    }
  };
}

module.exports = Order_customerController;

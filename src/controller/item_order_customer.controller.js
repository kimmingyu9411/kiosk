const Item_order_customer_Service = require("../service/item_order_customer.service.js");

class Item_order_customer_Controller {
  constructor() {
    this.item_order_customer_Service = new Item_order_customer_Service();
  }

  itemOrders = async (req, res, next) => {
    const orderList = req.body;
    const { customerId } = req.params;
    const itemOrders = await this.item_order_customer_Service.itemOrders(
      orderList,
      customerId
    );

    if (itemOrders.status === 400) {
      res.status(400).json({ errorMessage: itemOrders.errorMessage });
    } else {
      return res.status(200).json({ message: itemOrders.message });
    }
  };

  getOrders=async (req, res, next) => {
    const { customerId } = req.params;
    const getOrders = await this.item_order_customer_Service.getOrders(customerId);
    if (getOrders.status === 400) {
      res.status(400).json({ errorMessage: getOrders.errorMessage });
    } else {
      return res.status(200).json({ data: getOrders.data });
    }
  }
}

module.exports = Item_order_customer_Controller;

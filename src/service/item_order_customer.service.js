const Item_order_customer_Repository = require("../repository/item_order_customer.repository.js");
const Item = require("../db/models/item.js");
class Item_order_customer_Service {
  constructor() {
    this.item_order_customer_Repository = new Item_order_customer_Repository();
  }
  itemOrders = async (orderList, customerId) => {
    const itemId = await Object.keys(orderList);
    const itemAmount = await Object.values(orderList);
    return await this.item_order_customer_Repository.itemOrders(
      itemId[0],
      itemAmount[0],
      customerId
    );
  };

  getOrders = async (customerId) => {
    return await this.item_order_customer_Repository.getOrders(customerId);
  };
}

module.exports = Item_order_customer_Service;

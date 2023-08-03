const Order_customerRepository = require("../repository/order_customer.repository.js");
const Item = require("../db/models/item.js");
class Order_customerService {
  constructor() {
    this.order_customerRepository = new Order_customerRepository();
  }

  createOrder = async () => {

    return await this.order_customerRepository.createOrder();
  };

  completeOrder = async (customerId,state) => {
    
    return await this.order_customerRepository.completeOrder(customerId,state);
  }
}
module.exports = Order_customerService;

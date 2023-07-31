const Order_cutomerRepository = require("../repository/order_item.repository.js");
class Order_cutomerService {
  constructor() {
    this.order_cutomerRepository = new Order_cutomerRepository();
  }

  createOrder = async (itemId) => {
    if (!itemId) {
      return {
        status: 400,
        errorMessage: "상품을 입력하지 않았습니다.",
      };
    }

    return await this.order_cutomerRepository.createOrder(itemId);
  };
}
module.exports = Order_cutomerService;

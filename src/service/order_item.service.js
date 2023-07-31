const Order_itemRepository = require("../repository/order_item.repository.js");
class Order_itemService {
  constructor() {
    this.order_itemRepository = new Order_itemRepository();
  }

  createOrderItem = async (itemId, amount, user) => {
    if (!user) {
      return {
        status: 400,
        errorMessage: "발주의 권한이 없습니다. 로그인이 필요합니다.",
      };
    }

    if (!(typeof amount === "number")) {
      return {
        status: 400,
        errorMessage: "수량에는 숫자만 입력하실 수 있습니다.",
      };
    }

    return await this.order_itemRepository.createOrderItem(itemId, amount);
  };

  checkOrder = async (user) => {
    if (!user) {
      return {
        status: 400,
        errorMessage: "로그인이 필요한 기능입니다.",
      };
    }
    return await this.order_itemRepository.checkOrder();
  };

  changeState = async (user, state, order_itemId) => {
    
    if (!user) {
      return {
        status: 400,
        errorMessage: "로그인이 필요한 기능입니다.",
      };
    }

    return await this.order_itemRepository.changeState(state, order_itemId);
  };
}
module.exports = Order_itemService;

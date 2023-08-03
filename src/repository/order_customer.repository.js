const Item_order_customer = require("../db/models/item_order_customer.js");
const Item = require("../db/models/item.js");
const Order_customer = require("../db/models/order_customer.js");
class Order_customerRepository {
  async createOrder() {
    try {
      await Order_customer.create();

      return {
        status: 200,
        message: "주문하시고 싶은 메뉴를 클릭하세요.",
      };
    } catch {
      return {
        status: 400,
        message: "예기치 못한 오류가 발생했습니다, 다시 한번 시도해주십시오.",
      };
    }
  }

  async completeOrder(customerId, state) {
    const completeOrder = await Order_customer.update(
      { state },
      {
        where: { id: customerId },
      }
    );

    if (!completeOrder) {
      return {
        status: 400,
        errorMessage: "주문내역이 없습니다.",
      };
    }

    const orderQuantity = await Item_order_customer.findAll({
      where: { id: customerId },
    });

    if (!orderQuantity) {
      return {
        status: 400,
        errorMessage: "주문내역이 없습니다.",
      };
    }
    console.log(orderQuantity)
  

    return { status: 200, message: "주문하신 상품이 완성되었습니다." };
  }
}
module.exports = Order_customerRepository;

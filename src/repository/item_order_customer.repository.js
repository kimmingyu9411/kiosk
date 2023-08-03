const Item_order_customer = require("../db/models/item_order_customer.js");
const Item = require("../db/models/item.js");
const Order_customer = require("../db/models/order_customer.js");
class Item_order_customer_Repository {
  async itemOrders(itemId, itemAmount, customerId) {
    try {
      await Item_order_customer.create({
        itemId,
        amount: itemAmount,
        orderCustomerId: customerId,
      });
      return {
        status: 200,
        message: "상품을 주문목록에 넣었습니다.",
      };
    } catch (e) {
      console.error(e);
      return { status: 400, errorMessage: "다시 시도해주십시오." };
    }
  }
  async getOrders(customerId) {
    const orderList = await Item_order_customer.findAll({
      where: {
        orderCustomerId: customerId,
      },
      include: {
        model: Item,
        attributes:['name','price']
      },
    });
    if(!orderList){
      return { status: 400, errorMessage: "주문내역이 없습니다." }
    }
    return { status: 200, data:orderList };
  }
}

module.exports = Item_order_customer_Repository;

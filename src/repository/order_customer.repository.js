const Item_order_customer = require("../db/models/item_order_customer.js");
const Item = require("../db/models/item.js");
const Order_customer = require("../db/models/order_customer.js");
const sq = require("../db/db.js").sequelize;
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
    const t = await sq.transaction(); // 트랜잭션 생성
    try {
      const completeOrder = await Order_customer.update(
        { state },
        {
          where: { id: customerId },
        },
        {
          transaction: t,
        }
      );

      if (!completeOrder) {
        return {
          status: 400,
          errorMessage: "주문내역이 없습니다.",
        };
      }

      const orderQuantity = await Item_order_customer.findAll({
        where: { orderCustomerId: customerId },
      });

      if (!orderQuantity) {
        return {
          status: 400,
          errorMessage: "주문내역이 없습니다.",
        };
      }

      orderQuantity.forEach(async (item) => {
        const itemId = item.itemId;
        const itemAmount = item.amount;
        const exItem = await Item.findByPk(itemId);
        const nowAmount = exItem.amount - itemAmount;
        await Item.update(
          { amount: nowAmount },
          {
            where: { id: itemId },
          },
          {
            transaction: t,
          }
        );
      });
      await t.commit();
      return { status: 200, message: "주문하신 상품이 완성되었습니다." };
    } catch (e) {
      console.error(e);
      return { status: 400, message: "상품 완료 도중 에러가 발생했습니다." };
    }
  }
}

module.exports = Order_customerRepository;

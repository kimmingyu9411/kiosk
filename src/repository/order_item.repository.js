const Item = require("../db/models/item.js");
const Order_item = require("../db/models/order_item.js");
const sq = require('../db/db.js').sequelize;
class Order_itemRepository {
  async createOrderItem(itemId, amount) {
    const existingItem = await Item.findOne({ where: { id: itemId } });
    if (!existingItem) {
      return {
        status: 400,
        errorMessage: "해당 상품은 존재하지 않습니다.",
      };
    }

    await Order_item.create({
      itemId,
      amount,
      state: 0,
    });

    return {
      status: 200,
      message: "상품발주를 완료했습니다.",
    };
  }
  async checkOrder() {
    const allOrder = await Order_item.findAll();
    return {
      status: 200,
      message: "발주내역.",
      allOrder,
    };
  }

  //발주 상태를 바꾸는 메서드
  async changeState(state, order_itemId) {
    const t = await sq.transaction(); // 트랜잭션 생성
    //해당 발주 데이터를 가져온다.
    try {
      const existingOrder = await Order_item.findOne({
        where: { id: order_itemId },
      });

      if (!existingOrder) {
        return {
          status: 400,
          errorMessage: "해당 발주가 존재하지 않습니다.",
        };
      }

      //발주한 상품의 데이터를 가져온다.
      const existingItem = await Item.findOne({
        where: { id: existingOrder.itemId },
      });

      if (!existingItem) {
        return {
          status: 400,
          errorMessage: "해당 상품은 존재하지 않습니다.",
        };
      }

      //발주의 상태가 주문 상태일 때
      if (existingOrder.state == 0) {
        if (state == 0) {
          //같은 상태로 변경을 시도할 때
          return {
            status: 400,
            errorMessage: "해당 발주는 이미 주문이 된 상태입니다.",
          };
        }
        if (state == 2) {
          //주문 상태에서 완료 상태로 변경할 때
          return {
            status: 400,
            errorMessage: "해당 발주는 준비상태가 아닙니다.",
          };
        }

        await Order_item.update(
          { state },
          {
            where: { id: order_itemId },
          }
        );

        return {
          status: 200,
          message: "해당 발주가  준비 상태로 변경되었습니다.",
        };
      }

      //발주의 상태가 준비 상태일 때
      if (existingOrder.state == 1) {
        if (state == 0 || state == 1) {
          //같은 상태로 변경을 시도하거나 주문 상태로 변경을 시도할 때
          return {
            status: 400,
            errorMessage: "이미 준비단계의 상품입니다.",
          };
        }

        if (state == 2) {
          //발주의 상태가 완료 상태로 변경 될 때
          await Order_item.update(
            { state },
            {
              where: { id: order_itemId },
            },
            {
              transaction: t,
            }
          );

          const updateAmount = existingItem.amount + existingOrder.amount;
          //상품의 수량도 같이 업데이트한다.
          await Item.update(
            { amount: updateAmount },
            {
              where: { id: existingOrder.itemId },
            },
            {
              transaction: t,
            }
          );

          await t.commit();

          return {
            status: 200,
            message:
              "해당 발주가 완료되었습니다, 해당 상품의 수량을 확인해주십시오.",
          };
        }

        //발주를 취소할 때
        await Order_item.update(
          { state },
          {
            where: { id: order_itemId },
          }
        );
        return {
          status: 200,
          message: "해당 발주가 취소되었습니다.",
        };
      }

      //발주가 완료된 상품을 취소할 때
      if (existingOrder.state == 2) {
        if (state == 0 || state == 1 || state == 2) {
          //같은 상태로 변경을 시도하거나 주문, 준비 상태로 변경을 시도할 때
          return {
            status: 400,
            errorMessage: "이미 발주가 완료된 상품입니다.",
          };
        }
        //완료된 발주를 취소 할 때
        if (state == 3) {
          if (existingItem.amount < existingOrder.amount) {
            return {
              status: 400,
              errorMessage:
                "현재 수량보다 취소될 수량이 더 많이 때문에 취소할 수 없습니다.",
            };
          } else {
            //주문 상태를 바꾸고 현재 상품의 수량을 바꾼다.
            await Order_item.update(
              { state },
              {
                where: { id: order_itemId },
              },
              {
                transaction: t,
              }
            );

            const updateAmount = existingItem.amount - existingOrder.amount;

            await Item.update(
              { amount: updateAmount },
              {
                where: { id: existingOrder.itemId },
              },
              {
                transaction: t,
              }
            );

            await t.commit();

            return {
              status: 200,
              message:
                "완료된 발주를 취소하였습니다, 해당 상품의 수량을 확인해주십시오.",
            };
          }
        }
      }
      //취소된 발주의 상태를 바꾸려고 할 때
      if (existingOrder.state == 3) {
        return {
          status: 400,
          errorMessage: "이미 취소된 발주입니다.",
        };
      }
    } catch (err) {
      console.error(err);
      await t.rollback();
      return { status: 400, errorMessage: "발주상태를 변경하는 도중 오류가 발생했습니다." };
    }
  }
}

module.exports = Order_itemRepository;

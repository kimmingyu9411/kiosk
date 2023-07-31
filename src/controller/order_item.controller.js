const Order_itemService = require("../service/order_item.service.js");

class Order_itemController {
  constructor() {
    this.Order_itemService = new Order_itemService();
  }
  createOrderItem = async (req, res, next) => {
    const user = res.locals.user;
    const { itemId } = req.params;
    const { amount } = req.body;

    const createOrderItem = await this.Order_itemService.createOrderItem(
      itemId,
      amount,
      user
    );
    if (createOrderItem.status === 400) {
      return res
        .status(400)
        .json({ errorMessage: createOrderItem.errorMessage });
    } else {
      return res.status(200).json({ message: createOrderItem.message });
    }
  };

  checkOrder = async (req, res, next) => {
    const user = res.locals.user;

    const checkOrder = await this.Order_itemService.checkOrder(user);

    if (checkOrder.status === 400) {
      return res.status(400).json({ errorMessage: checkOrder.errorMessage });
    } else {
      return await res.status(200).json({ data: checkOrder.allOrder });
    }
  };

  changeState = async (req, res, next) => {
    const user = res.locals.user;
    const { order_itemId } = req.params;
    const { state } = req.body;
    
    const orderState = await this.Order_itemService.changeState(
      user,
      state,
      order_itemId
    );

    if (orderState.status === 400) {
      return res.status(400).json({ errorMessage: orderState.errorMessage });
    } else {
      return await res.status(200).json({ message: orderState.message });
    }
  };
}
module.exports = Order_itemController;

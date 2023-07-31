const Item = require("../db/models/item.js");
const User = require("../db/models/user.js");
class ItemRepository {
  async createItem(user, name, price, type, amount) {
    const existingItem = await Item.findOne({ where: { name } });
    const userId = await User.findOne({ where: { id: user.id } });

    if (existingItem) {
      return {
        status: 400,
        errorMessage: "이미 사용 중인 상품명입니다.",
      };
    }

    await Item.create({
      name,
      price,
      type,
      userId: userId.id,
    });

    return {
      status: 200,
      message: "상품이 등록되었습니다.",
    };
  }

  async getAllItem() {
    const getAllItem = await Item.findAll();
    if (getAllItem) {
      return {
        status: 200,
        message: "상품 조회에 성공했습니다.",
        getAllItem,
      };
    } else {
      return {
        status: 400,
        errorMessage: "상품 조회 중 오류가 발생했습니다.",
      };
    }
  }

  async updateItem(itemId, updateValues) {
    const existingItem = await Item.findOne({
      where: { name: updateValues.name },
    });
    if (existingItem) {
      return {
        status: 400,
        errorMessage: "이미 사용 중인 상품명입니다.",
      };
    }
    const updateitem = await Item.update(updateValues, {
      where: { id: itemId },
    });
    if (!updateitem[0]) {
      return {
        status: 400,
        errorMessage: "해당 상품은 존재하지 않습니다.",
      };
    }
    return { status: 200, message: "상품이 업데이트 됐습니다.", updateitem };
  }

  async deleteItem(itemId) {
    try {
      const item = await Item.findOne({
        where: { id: itemId.itemId },
      });

      if (!item) {
        return {
          status: 400,
          errorMessage: "해당 상품을 찾을 수 없습니다.",
        };
      }

      if (item.amount > 0) {
        return {
          status: 401,
          errorMessage: "현재 수량이 남아있습니다. 삭제하시겠습니까?",
          item,
        };
      }

      await item.destroy();

      return {
        status: 200,
        message: "상품 삭제가 완료되었습니다.",
      };
    } catch (error) {
      console.error("상품 삭제 중 오류:", error);
      return {
        status: 400,
        errorMessage: "상품 삭제 중 오류가 발생했습니다.",
      };
    }
  }
  async reDeleteItem(itemId) {
    const item = await Item.findOne({
      where: { id: itemId },
    });
    if (!item) {
      return {
        status: 400,
        errorMessage: "해당 상품을 찾을 수 없습니다.",
      };
    }

    await item.destroy();

    return {
      status: 200,
      message: "상품 삭제가 완료되었습니다.",
    };
  }
}

module.exports = ItemRepository;

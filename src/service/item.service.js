const { indexOf } = require("../db/models/index.js");
const ItemRepository = require("../repository/item.repository.js");
class ItemService {
  constructor() {
    this.itemRepository = new ItemRepository();
  }

  createItem = async (user, name, price, type) => {
    const typevalue = ["coffee", "juice", "food"];

    if (!user) {
      return {
        status: 400,
        errorMessage: "상품등록의 권한이 없습니다.",
      };
    }
    if (price <= 0) {
      return {
        status: 400,
        errorMessage: "가격에 0보다 작은 수를 입력하실 수 없습니다.",
      };
    }

    if (!(typeof price === "number")) {
      return {
        status: 400,
        errorMessage: "가격에는 숫자만 입력하실 수 있습니다.",
      };
    }
    if (typevalue.indexOf(type) == -1) {
      return {
        status: 400,
        errorMessage: "설정된 타입이 아닙니다.",
      };
    }
    if (!name || !price || !type) {
      return {
        status: 400,
        errorMessage: "데이터를 빠짐없이 기입해야합니다.",
      };
    }

    return await this.itemRepository.createItem(user, name, price, type);
  };
}
module.exports = ItemService;

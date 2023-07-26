const Item = require("../db/models/item.js");
const User = require("../db/models/user.js");
class ItemRepository {
  async createItem(user, name, price, type, amount) {
    const existingItem = await Item.findOne({ where: { name } });
    const userId = await User.findOne({ where: { id:user.id } });
    
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
      amount,
      userId:userId.id
    });

    return {
      status: 200,
      message: "상품이 등록되었습니다.",
    };
  }
}
module.exports = ItemRepository;

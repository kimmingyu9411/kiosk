// Models
const Item = require("./item.js");
const Item_order_customer = require("./item_order_customer.js");
const Option = require("./option.js");
const Order_customer = require("./order_customer.js");
const Order_item = require("./order_item.js");
const User = require("./user.js");

//User
User.hasOne(Item);
// Item
Item.hasOne(Order_item);
Item.hasOne(Item_order_customer);
Item.belongsTo(Option);
Item.belongsTo(User);
// Item_order_customer
Item_order_customer.belongsTo(Item);
//Option
Option.hasOne(Item);
//Order_customer
Order_customer.hasOne(Item_order_customer);
//Order_item
Order_item.belongsTo(Item);

module.exports = [
  User,
  Item,
  Item_order_customer,
  Option,
  Order_customer,
  Order_item,
];

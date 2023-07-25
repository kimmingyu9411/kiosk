const DataTypes = require("sequelize").DataTypes;
const connector = require("../db.js");

const Order_item = connector.sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = Order_item;
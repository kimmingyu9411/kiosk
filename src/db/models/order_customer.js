const DataTypes = require("sequelize").DataTypes;
const connector = require("../db.js");

const Order_customer = connector.sequelize.define(
  "order_customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false,
    },
  },
  { timestamps: true }
);

module.exports = Order_customer;
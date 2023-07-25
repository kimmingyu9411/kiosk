const DataTypes = require("sequelize").DataTypes;
const connector = require("../db.js");

const Item = connector.sequelize.define(
  "item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["COFFEE", "JUICE", "FOOD"],
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Item;

const DataTypes = require("sequelize").DataTypes;
const connector = require("../db.js");
const itemType = {
  COFFEE: "coffee",
  JUICE: "juice",
  FOOD: "food",
};

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
      type: DataTypes.ENUM({
        values:[ "coffee", "juice", "food" ]
      }),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    },
  },
  { timestamps: true }
);

module.exports = Item;

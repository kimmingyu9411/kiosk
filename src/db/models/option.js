const DataTypes = require("sequelize").DataTypes;
const connector = require("../db.js");

const Option = connector.sequelize.define(
  "option",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    extra_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shot_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = Option;

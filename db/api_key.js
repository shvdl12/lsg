const Sequelize = require("sequelize");
const sequelize = require("./config");

const serial = sequelize.define(
  "tbl_api_key",
  {
    serviceKey: {
      type: Sequelize.STRING(40),
      primaryKey: true
    },
    corpName: {
      type: Sequelize.STRING(40),
      unique: true
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
    enrolloer: {
      type: Sequelize.STRING(12)
    },
  }
);

module.exports = serial;

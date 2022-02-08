const Sequelize = require("sequelize");
const sequelize = require("./config");

const group = sequelize.define(
  "tbl_group",
  {
    seqNo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.STRING(12)
    },
    groupName: {
      type: Sequelize.STRING(20)
    },
    createdAt: {
      type: Sequelize.STRING(14)
    }
  }
);

module.exports = group;

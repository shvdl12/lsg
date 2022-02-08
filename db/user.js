const Sequelize = require("sequelize");
const sequelize = require("./config");

const user = sequelize.define(
  "tbl_user",
  {
    userId: {
      type: Sequelize.STRING(12),
      primaryKey: true
    },
    userPass: {
      type: Sequelize.CHAR(60)
    },
    userName: {
      type: Sequelize.STRING(12)
    },
    email: {
      type: Sequelize.STRING(40)
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
    loginAt: {
      type: Sequelize.CHAR(14)
    },
    phoneNumber: {
      type: Sequelize.STRING(20)
    },
    corpName: {
      type: Sequelize.STRING(20)
    },
    bossName: {
      type: Sequelize.STRING(12)
    },
    address: {
      type: Sequelize.STRING(40)
    },
    addressDetail: {
      type: Sequelize.STRING(40)
    },
    bizNum: {
      type: Sequelize.STRING(40)
    },
    startContract: {
      type: Sequelize.CHAR(10)
    },
    endContract: {
      type: Sequelize.CHAR(10)
    },
  }
);

module.exports = user;

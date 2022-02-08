const Sequelize = require("sequelize");
const sequelize = require("./config");

const serial = sequelize.define(
  "tbl_serial",
  {
    seqNo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    serialKey: {
      type: Sequelize.STRING(40)
    },
    corpName: {
      type: Sequelize.STRING(40)
    },
    macAddr: {
      type: Sequelize.STRING(20)
    },
    email: {
      type: Sequelize.STRING(40)
    },
    alias: {
      type: Sequelize.STRING(20)
    },
    ip: {
      type: Sequelize.STRING(30)
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
    registeredAt: {
      type: Sequelize.CHAR(14)
    },
    lastCheckedAt: {
      type: Sequelize.CHAR(14)
    },
    isUsed: {
      type: Sequelize.CHAR(1)
    },
    enrolloer: {
      type: Sequelize.STRING(12)
    },
  }
);

module.exports = serial;

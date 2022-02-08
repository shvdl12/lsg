const Sequelize = require("sequelize");
const sequelize = require("./config");

const msg = sequelize.define(
  "tbl_msg",
  {
    userId: {
      type: Sequelize.STRING(12)
    },
    deviceId: {
      type: Sequelize.CHAR(16),
      primaryKey: true
    },
    pm1: {
      type: Sequelize.STRING(6)
    },
    pm25: {
      type: Sequelize.STRING(6)
    },
    pm100: {
      type: Sequelize.STRING(6)
    },
    co2: {
      type: Sequelize.STRING(6)
    },
    hcho: {
      type: Sequelize.STRING(6)
    },
    tvoc: {
      type: Sequelize.STRING(6)
    },
    radon: {
      type: Sequelize.STRING(6)
    },
    temperature: {
      type: Sequelize.STRING(4)
    },
    humidity: {
      type: Sequelize.STRING(4)
    },
    rtime: {
      type: Sequelize.CHAR(20)
    },
    publishTime: {
      type: Sequelize.CHAR(20)
    },
    ip: {
      type: Sequelize.STRING(30)
    },
    ip_public: {
      type: Sequelize.STRING(30)
    },
    isallowed: {
      type: Sequelize.CHAR(1)
    },
  }
);

module.exports = msg;

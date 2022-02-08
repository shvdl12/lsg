const Sequelize = require("sequelize");
const sequelize = require("./config");

const deviceTokens = sequelize.define(
  "tbl_deviceTokens",
  {
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
  }
);

module.exports = deviceTokens;

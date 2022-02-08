const Sequelize = require("sequelize");
const sequelize = require("./config");

const device_admin = sequelize.define(
  "tbl_admin_device",
  {
    deviceId: {
      type: Sequelize.CHAR(16),
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING(12),
    },
    enrolloer: {
      type: Sequelize.STRING(12)
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
  }
);

module.exports = device_admin;

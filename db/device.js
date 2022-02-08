const Sequelize = require("sequelize");
const sequelize = require("./config");

const device = sequelize.define(
  "tbl_device",
  {
    deviceId: {
      type: Sequelize.CHAR(16),
      primaryKey: true
    },
    userId: {
      type: Sequelize.STRING(12),
    },
    mgmtId: {
      type: Sequelize.STRING(24)
    },
    alias: {
      type: Sequelize.STRING(40)
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
    sort_idx: {
      type: Sequelize.INTEGER()
    }
  }
);

module.exports = device;

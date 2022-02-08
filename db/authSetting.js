const Sequelize = require("sequelize");
const sequelize = require("./config");

const authSetting = sequelize.define(
  "tbl_authSetting",
  {
    userId: {
      type: Sequelize.STRING(12),
      primaryKey: true
    },
    isWebUsed: {
      type: Sequelize.CHAR(1)
    },
    isViewerUsed: {
      type: Sequelize.CHAR(1)
    },
    isAppUsed: {
      type: Sequelize.CHAR(1)
    },
    ViewerCount: {
      type: Sequelize.INTEGER
    },
  }
);

module.exports = authSetting;

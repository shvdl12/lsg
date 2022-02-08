const Sequelize = require("sequelize");
const sequelize = require("./config");

const viewerOption = sequelize.define(
  "tbl_viewerOption",
  {
    deviceId: {
      type: Sequelize.STRING(16),
      primaryKey: true
    },
    screenTitle: {
      type: Sequelize.STRING(20)
    },
    mainValue: {
      type: Sequelize.STRING(20)
    },
    slideInterval: {
      type: Sequelize.INTEGER
    },
    isMainDisplayed: {
      type: Sequelize.CHAR(1)
    },
    isAirkrDisplayed: {
      type: Sequelize.CHAR(1)
    },
    isCovidDisplayed: {
      type: Sequelize.CHAR(1)
    },
    isImageDisplayed: {
      type: Sequelize.CHAR(1)
    },
    airkrSi: {
      type: Sequelize.STRING(20)
    },
    airkrGu: {
      type: Sequelize.STRING(20)
    }
  }
);

module.exports = viewerOption;

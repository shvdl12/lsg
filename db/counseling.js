const Sequelize = require("sequelize");
const sequelize = require("./config");

const counseling = sequelize.define(
  "tbl_counseling",
  {
    idx: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(20)
    },
    phone: {
      type: Sequelize.STRING(20)
    },
    kind: {
      type: Sequelize.STRING(20)
    },
    comment: {
      type: Sequelize.STRING(2000)
    },
    registeredAt: {
      type: Sequelize.DataTypes.DATE
    }
  }
);

module.exports = counseling;

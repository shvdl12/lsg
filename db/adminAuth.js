const Sequelize = require("sequelize");
const sequelize = require("./config");

const adminAuth = sequelize.define(
  "tbl_admin_auth",
  {
    adminPass: {
      type: Sequelize.STRING(100),
      primaryKey: true
    }
  }
);

module.exports = adminAuth;

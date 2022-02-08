const Sequelize = require("sequelize");
const sequelize = require("./config");

const authNumbers = sequelize.define(
  "tbl_authNumbers",
  {
    callphone: {
      type: Sequelize.STRING(20),
    },
    reqphone: {
      type: Sequelize.STRING(20),
    },
    authNumber: {
      type: Sequelize.CHAR(5),
    },
    createdAt: {
      type: Sequelize.CHAR(14)
    },
    isUsed: {
      type: Sequelize.CHAR(2),
    },
  }
);

authNumbers.removeAttribute('id');
module.exports = authNumbers;

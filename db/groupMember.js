const Sequelize = require("sequelize");
const sequelize = require("./config");

const groupMember = sequelize.define(
  "tbl_groupMember",
  {
    seqNo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.STRING(12)
    },
    groupName: {
      type: Sequelize.STRING(20)
    },
    deviceId: {
      type: Sequelize.STRING(16)
    },
    createdAt: {
      type: Sequelize.STRING(14)
    }
  }
);

module.exports = groupMember;

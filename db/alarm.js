const Sequelize = require("sequelize");
const sequelize = require("./config");

const alarm = sequelize.define(
  "tbl_alarm",
  {
    userId: {
      type: Sequelize.STRING(12),
      primaryKey: true
    },
    alarmPower: {
      type: Sequelize.STRING(1),
      defaultValue: ''
    },
    alarmCycle: {
      type: Sequelize.STRING(5),
      defaultValue: ''
    },
    alarmStandard: {
      type: Sequelize.STRING(10),
      defaultValue: ''
    },
    good: {
      type: Sequelize.CHAR(1)
    },
    bad: {
      type: Sequelize.CHAR(1)
    },
    normal: {
      type: Sequelize.CHAR(1)
    },
    veryBad: {
      type: Sequelize.CHAR(1)
    },
    device_token: {
      type: Sequelize.STRING(200)
    },
  }
);

module.exports = alarm;

const express = require('express');
const router = express.Router();
const alarm = require('../db/alarm')
const verifyToken = require('../middleware/web');
const logger = require('../logger');

router.get('/getAlarmSetting', verifyToken, async function (req, res) {


  try {

    var alarmSetting = await alarm.findOne({
      where: {
        userId: req.userId
      }
    })
    if (alarmSetting.alarmPower === 'Y') {
      alarmSetting.alarmPower = true;
    } else {
      alarmSetting.alarmPower = false;
    }

    res.status(200).json({
      alarmSetting,
      token: req.token
    });

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
  }

})

router.post('/setAlarmSetting', verifyToken, async function (req, res) {

  var alarmSetting = req.body
  if (alarmSetting.alarmPower) {
    alarmSetting.alarmPower = 'Y'
  } else {
    alarmSetting.alarmPower = 'N'
  }
  
  alarm.update(alarmSetting, {
    where: {
      userId: req.userId
    }
  }).then((result) => {

    res.json({
      code: 200,
      message: 'success',
      token: req.token
    })
  }).catch(err => {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.json({
      code: 400,
      message: 'Update Account Failed',
      token: req.token
    })
  })
})

module.exports = router;
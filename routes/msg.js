const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/web');
const verifyServiceKey = require('../middleware/api');
const moment = require('moment');
const msg = require('../db/msg');
const device = require('../db/device'); 
const stat = require('../db/stat');
const admin_device = require('../db/admin_device');
const logger = require('../logger');
const Sequelize = require('../db/config');


const stat_query = "SELECT a.deviceId, b.alias, SUBSTRING(a.publishTime,1,:criteria) AS date, ROUND(AVG(a.pm1)) AS avg1, ROUND(AVG(a.pm25)) AS avg25, " + 
  " ROUND(AVG(a.pm100)) AS avg100, ROUND(AVG(a.hcho)) AS avgHcho, ROUND(AVG(a.co2)) AS avgCo2," +
  " ROUND(AVG(a.temperature)) AS avgTemp, ROUND(AVG(a.humidity)) AS avgHumi FROM tbl_stat a INNER JOIN tbl_device b on a.deviceId = b.deviceId" +
  " WHERE a.deviceId=:deviceId" +
  " AND a.publishTime > :startTime AND a.publishTime < :endTime" +
  " GROUP BY SUBSTRING(a.publishTime,1,:criteria);"

  /*
router.get('/recent/:deviceId', async function (req, res) {
  try {
    const msgData = await msg.findAll({
      limit: 1,
      attributes:['deviceId', 'pm1', 'pm25', 'pm100', 'co2', 'hcho', 'temperature', 'humidity', 'rtime', 'publishTime'],
      where: {
        deviceId: req.params.deviceId
      },
      order: [
        ["publishTime", "DESC"]
      ]
    });
    
    if (msgData.length === 0) {

      const deviceData = await device.findAll({
        where: {
          deviceId: req.params.deviceId
        }
      })

      if(deviceData.length) {
        res.status(200).json({
          code: '3000',
          message: 'No data today'
        });
      }else {
        res.status(200).json({
          code: '2000',
          message: 'Invalid device ID'
        });
      }
      
    }else {
      res.status(200).json({
        code: '0000',
        data: msgData[0],
      });
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: '9999',
      message: "Server error"
    })
  }
})*/

router.get('/recent/:deviceId', async function (req, res) {
  try {
    const result = await Sequelize.query('CALL PROC_SELCT_GROUP_AVG_DATA(:deviceId)', {
      replacements: {
        deviceId: req.params.deviceId
      },
      type: Sequelize.QueryTypes.SELECT
    })

    if(result && result[0][0].pm1) {
      res.status(200).json(result[0][0]);
    }
    else {
      res.status(200).json({
        pm1: 0,
        pm25: 0,
        pm100: 0,
        co2: 0,
        hcho: 0,
        tvoc: 0,
        radon: 0,
        temperature: 0,
        humidity: 0,
        rtime: 0,
        publishTime: 0
      });
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

router.post('/send', async function (req, res) {
  try {
    
    req.body.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const time = moment().format("YYYY-MM-DD HH:mm:ss")

    const result = await device.findAll({
      where: {
        deviceId: req.body.data.uuid
      }
    })
    const data = {
      userId: result.length > 0 ? result[0].userId : null,
      deviceId: req.body.data.uuid,
      pm1: req.body.data.pm1,
      pm25: req.body.data.pm25,
      pm100: req.body.data.pm100,
      co2: req.body.data.co2,
      hcho: req.body.data.hcho,
      tvoc: req.body.data.tvoc,
      radon: req.body.data.radon,
      temperature: req.body.data.temp,
      humidity: req.body.data.humidity,
      publishTime: req.body.data.publish_date,
      rtime: time,
      ip: req.body.data.ip,
      ip_public: req.body.ip,
      isallowed: result.length > 0 ? "Y" : "N"
    }

   await msg.create(data);
    
    if(result.length) {

      delete data.isallowed;
      delete data.userId;
      await stat.create(data);

      res.status(200).json({
        code: 200,
        message: "success"
      })

    }else {
      res.status(200).json({
        code: 401,
        message: "unauthorized device"
      })
    }

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

router.get('/recent', verifyToken, async function (req, res) {
  try {

    var check = 0;

    const query = "SELECT DISTINCT b.mgmtId, b.alias, b.sort_idx, a.deviceId, a.pm1, a.pm100, a.pm25, a.co2, a.hcho, a.tvoc, a.radon, a.temperature, a.humidity, a.publishTime" +
    " FROM tbl_msg a" +
    " JOIN tbl_device b" +
    " ON a.deviceId = b.deviceId" +
    " where (a.deviceId ,a.publishTime) IN" +
    " (SELECT deviceId,MAX(publishTime) FROM tbl_msg" +
    " WHERE userId=:userId GROUP BY deviceId)"
                    
    const deviceList = await device.findAll({
      attributes: ['deviceId', 'mgmtId', 'alias','sort_idx'],
      where: {
        userId: req.userId
      }
    })

    const result = await Sequelize.query(query, {
      replacements: {
        userId: req.userId
      },
      type: Sequelize.QueryTypes.SELECT
    })
    
    deviceList.forEach(device => {
      check = 0;

      result.forEach(data => {
        if(data.deviceId === device.deviceId) {
          check = 1;
          return;
        }
      })

      if(check === 0 ){
        result.push({
          
          deviceId: device.deviceId,
          mgmtId: device.mgmtId,
          alias: device.alias,
          sort_idx: device.sort_idx,
          pm1: 0,
          pm25: 0,
          pm100: 0,
          co2: 0,
          hcho: 0,
          tvoc: 0,
          radon: 0,
          temperature: 0,
          humidity: 0,
          publishTime: 0,
          rtime: 0,
        
        })
      }
    }) 

  result.sort(function (a,b) {
    if (a.sort_idx > b.sort_idx) {
      return 1;
    }
    if (a.sort_idx < b.sort_idx) {
      return -1;
    }
    
    return 0;
  });

  res.status(200).json({
    code: 200,
    data: result,
    token: req.token
  });

    
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.get("/stat/:criteria", async function (req, res) {

  try {

    var repalceParams = {
      deviceId: req.headers.deviceid,
      startTime: req.headers.starttime,
      endTime: req.headers.endtime,
      criteria: req.params.criteria === 'time' ? 14 : req.params.criteria === 'day' ?  10 : 16
    }
    
    logger.info(`${req.originalUrl} header ${JSON.stringify(repalceParams)}`)
    
    Sequelize.query(stat_query, {
        replacements: repalceParams,
        type: Sequelize.QueryTypes.SELECT
      })
      .then(function (data) {
        res.status(200).json(data);
      })
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 400,
      message: err
    });
  }
})

router.get("/excel/:criteria", function (req, res) {

  try {
    
    const resData = [
      ['기기 번호', '관리 이름', '날짜', '극초미세먼지', '초미세먼지', '미세먼지', '포름알데히드', '이산화탄소', '온도', '습도']
    ];

    var values = {
      deviceId: req.headers.deviceid,
      startTime: req.headers.starttime,
      endTime: req.headers.endtime,
      criteria: req.params.criteria === 'time' ? 14 : req.params.criteria === 'day' ?  10 : 16
    }
    
    logger.info(`${req.originalUrl} header ${JSON.stringify(values)}`)

    Sequelize.query(stat_query, {
        replacements: values,
        type: Sequelize.QueryTypes.SELECT
      })
      .then(function (data) {

        if(data.length === 0) {
          res.status(200).json({
            code: 400,
            message: 'no data'
        });
        }else {
          data.forEach((value, index) => {
            resData.push(["\n" + value.deviceId, value.alias, value.date, value.avg1, value.avg25, value.avg100, value.avgCo2, value.avgHcho, value.avgTemp, value.avgHumi])
  
            if (index === data.length - 1) {
              
              res.status(200).json({
                code: 200,
                data: resData
              });
            }
          });
        }
      })
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 400,
      message: err
    });
  }
})

module.exports = router;

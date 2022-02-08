const express = require('express');
const router = express.Router();
const device = require('../db/device'); 
const admin_device = require('../db/admin_device'); 
const verifyToken = require('../middleware/web');
const logger = require('../logger');
const sequelize = require('../db/config');

router.get('/info', verifyToken, async function (req, res, next) {

  try {
    
    const result = await device.findAll({
      where: {
        userId: req.userId
      },
      order: [
        ['sort_idx', 'ASC']
      ]
    })
    res.status(200).json({
      code: 200,
      data: result,
      token: req.token
    });
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    });
  }
});

router.post('/create', verifyToken, async function (req, res, next) {

  try {
    
    await device.update({
      sort_idx: sequelize.literal('sort_idx + 1')
    }, {
      where: {
        userId: req.userId,
      }
    })

    await device.create({
      deviceId: req.body.deviceId,
      userId: req.userId,
      mgmtId: req.body.mgmtId,
      alias: req.body.alias
    })
    
    res.status(200).json({
      code: 200,
      message: 'success',
      token: req.token
    });
    
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(200).json({
        code: 400,
        message: "이미 등록된 기기 입니다.",
        token: req.token
      })
    } else {
      res.status(500).json({
        message: "server error"
      })
    }
  }
});

router.post('/update', verifyToken, async function (req, res, next) {

  try {
    
    const result = await device.update({
      mgmtId: req.body.mgmtId,
      alias: req.body.alias
    }, {
      where: {
        userId: req.userId,
        deviceId: req.body.deviceId
      }
    })

    if (result[0]) {
      res.status(200).json({
        code: 200,
        message: "success",
        token: req.token
      });
    } else {
      res.status(200).json({
        code: 400,
        message: "fail",
        token: req.token
      });
    }

  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    })
  }
});

router.post("/update/sort", verifyToken, async function (req, res, next) {

  try {

    const target = req.body.direction === "up" ? req.body.index - 1 : req.body.index + 1
    
    await device.update({
      sort_idx: req.body.index
    }, {
      where: {
        userId: req.userId,
        sort_idx: target
      }
    })

    await device.update({
      sort_idx: target
    }, {
      where: {
        userId: req.userId,
        deviceId: req.body.deviceId
      }
    })
    
    res.status(200).json({
      code: 200,
      message: "success",
      token: req.token
    });
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    })
  }
})

router.post("/update/sort/all", verifyToken, async function (req, res, next) {

  try {
    await device.update({
      sort_idx: req.body.index
    }, {
      where: {
        deviceId: req.body.deviceId,
      }
    })
    res.status(200).json({
      code: 200,
      message: "success",
      token: req.token
    });
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    })
  }
})

router.post('/delete', verifyToken, async function (req, res, next) {

  try {

    const result = await device.destroy({
      where: {
        userId: req.userId,
        deviceId: req.body.deviceId
      }
    })
    
    if (result) {
      res.status(200).json({
        code: 200,
        message: "success",
        token: req.token
      });
    } else {
      res.status(200).json({
        code: 400,
        message: "fail",
        token: req.token
      });
    }

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
});

module.exports = router;

const express = require('express');
const { token } = require('morgan');
const router = express.Router();
const groupMember = require('../db/groupMember');
const logger = require('../logger');
const verifyToken = require('../middleware/web');
const Sequelize = require('../db/config');

router.get('/notInclude', verifyToken, async function (req, res, next) {

  try {
    const sql = "select * from tbl_device where userId = :userId" +
      " and deviceId not in " +
      " (select deviceId from tbl_groupMember" +
      " where userId = :userId)"

    const result = await Sequelize.query(sql, {
      replacements: {
        userId: req.userId,
      },
      type: Sequelize.QueryTypes.SELECT
    })

    res.status(200).json({
      code: 200,
      data: result,
      token: req.token
    })

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

router.post('/create', verifyToken, async function (req, res, next) {
  try {
    await groupMember.create({
      userId: req.userId,
      groupName: req.body.groupName,
      deviceId: req.body.deviceId
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
});

router.post('/delete', verifyToken, async function (req, res, next) {

  try {
    const result = await groupMember.destroy({
      where: {
        userId: req.userId,
        groupName: req.body.groupName,
        deviceId : req.body.deviceId
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

router.get('/:groupName', verifyToken, async function (req, res, next) {

  try {

    const sql = "select a.*, b.alias from tbl_groupMember a" +
      " join tbl_device b on a.userId = b.userId and a.deviceId = b.deviceId" +
      " where a.groupName=:groupName" +
      " and a.userId =:userId"

    const result = await Sequelize.query(sql, {
      replacements: {
        userId: req.userId,
        groupName: req.params.groupName
      },
      type: Sequelize.QueryTypes.SELECT
    })

    res.status(200).json({
      code: 200,
      data: result,
      token: req.token
    })

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

module.exports = router;
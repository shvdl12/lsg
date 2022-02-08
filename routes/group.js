const express = require('express');
const router = express.Router();
const group = require('../db/group');
const groupMember = require('../db/groupMember');
const logger = require('../logger');
const verifyToken = require('../middleware/web');

router.get('/all', verifyToken, async function(req, res, next){
    
    const search = await group.findAll({
      attributes:["userid","groupName"],
        where: {
          userId: req.userId
        }
      })
      
      res.status(200).json({
        code: 200,
        data: search,
        token: req.token
    })
})

router.post('/delete', verifyToken, async function (req, res, next) {

  try {
    const result = await group.destroy({
      where: {
        userId: req.userId,
        groupName: req.body.groupName
      }
    })

    if (result) {
      await groupMember.destroy({
        where: {
          userId: req.userId,
          groupName: req.body.groupName
        }
      })
      res.status(200).json({
        code: 200,
        message: "success",
        token: req.token
      });
    } else {
      res.status(200).json({
        code: 400,
        message: "그룹 삭제 실패",
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

router.post('/create', verifyToken, async function (req, res, next) {
  try {

    await group.create({
      userId: req.userId,
      groupName: req.body.groupName
    })

    res.status(200).json({
      code: 200,
      message: "success",
      token: req.token
    });


  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(200).json({
        code: 400,
        message: "이미 등록된 그룹 입니다.",
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
    const result = await group.update({
      groupName: req.body.newName
    }, {
      where: {
        userId: req.userId,
        groupName: req.body.originalName
      }
    })

    if (result[0]) {

      await groupMember.update({
        groupName: req.body.newName
      }, {
        where: {
          userId: req.userId,
          groupName: req.body.originalName
        }
      })

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

    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(200).json({
        code: 400,
        message: "이미 등록된 그룹 입니다.",
        token: req.token
      })
    } else {
      res.status(500).json({
        message: "server error"
      })
    }
  }
});

module.exports = router;
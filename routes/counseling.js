const express = require('express');
const router = express.Router();
const counseling = require('../db/counseling'); 
const adminAuth = require('../db/adminAuth'); 
const logger = require('../logger');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/index');
const bcrypt = require('bcrypt')
const Sequelize = require("sequelize")

router.get('/auth/update/:pw', async function (req, res, next) {

  try {
    const newAdminPass = bcrypt.hashSync(req.params.pw, 10)
    await adminAuth.update({
      adminPass: newAdminPass,
    }, {
      where: {
        adminPass: {
          [Sequelize.Op.ne]: null
        }
      }
    })
    
    res.status(200).send("success")
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).send("fail")
  }
});

router.post('/auth', async function (req, res)  {
  try {

    const result = await adminAuth.findOne();
    
    if(result && bcrypt.compareSync(req.body.adminPass, result.adminPass)) {
      const token = jwt.sign({
        userId: req.body.userId,
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
        issuer: process.env.JWT_ISSUER,
      });
  
      res.status(200).json({
        code: 200,
        token: token
      })

    }else {
      res.status(200).json({
        code: 400,
        message: '인증 실패'
      })
    }
  }
  catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
})

router.get('/list', verifyToken, async function (req, res, next) {

  try {
    
    const result = await counseling.findAll({
      order: [
        ['idx', 'DESC']
      ]
    })

    res.status(200).json({
      code: 200,
      data: result,
    });
    
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    });
  }
});

router.post('/create', async function (req, res, next) {
  try {
    
    await counseling.create(req.body)
    
    res.status(200).json({
      code: 200,
      message: 'success',
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

    const result = await counseling.destroy({
      where: {
        idx: req.body
      }
    })
    
    if (result) {
      res.status(200).json({
        code: 200,
        message: "success",
      });
    } else {
      res.status(200).json({
        code: 400,
        message: "fail",
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

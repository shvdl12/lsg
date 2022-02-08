const express = require('express');
const router = express.Router();
const counseling = require('../db/counseling'); 
const logger = require('../logger');
const sequelize = require('../db/config');

router.get('/list', async function (req, res, next) {

  try {
    
    const result = await counseling.findAll({
      order: [
        ['idx', 'DESC']
      ]
    })
    console.log(result)

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
router.post('/delete', async function (req, res, next) {

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

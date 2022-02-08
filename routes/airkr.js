const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/web');
const request = require('request-promise');
const logger = require('../logger');


router.get('/data', verifyToken, async function (req, res) {
  try {
  
    var url = process.env.AIRKR_URL + '/airkorea/data'
    var data = await request.get({url: url, qs: req.query})
    data = JSON.parse(data)

    res.status(200).json(data.data)
    
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

router.get('/list/si', verifyToken, async function (req, res) {
  try {
    
    var data = await request.get(process.env.AIRKR_URL + '/airkorea/location/siList')
    data = JSON.parse(data)
    
    res.status(200).json(data.data)

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})

router.get('/list/gu', verifyToken, async function (req, res) {
  try {
    
    var data = await request.get(process.env.AIRKR_URL + '/airkorea/location/guList')
    data = JSON.parse(data)

    res.status(200).json(data.data)

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: "server error"
    })
  }
})




module.exports = router;

const express = require('express');
const router = express.Router();
const logger = require('../logger.js')
const fs =  require('fs')
const path = require('path')


router.get("/terms", async function (req, res) {

  try {
    
    fs.readFile(path.join(__dirname, '../files/terms.txt'), 'utf8', function (err, data) {
      res.status(200).json(data)
    });

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: 'server error'
    })
  }
})

router.get("/termsSub", async function (req, res) {

  try {
    
    fs.readFile(path.join(__dirname, '../files/termsSub.txt'), 'utf8', function (err, data) {
      res.status(200).json(data)
    });

  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: 'server error'
    })
  }
})

router.get("/privacy", async function (req, res) {

  try {
    
    fs.readFile(path.join(__dirname, '../files/privacy.txt'), 'utf8', function (err, data) {
      res.status(200).json(data)
    });


  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: 'server error'
    })
  }
})

module.exports = router;

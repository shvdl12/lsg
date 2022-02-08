const express = require('express');
const router = express.Router();
const viewerOption = require('../db/viewerOption');
const logger = require('../logger')
const moment = require('moment')
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const imgPath = path.join(__dirname, '../public', 'viewerImage')
const verifyToken = require('../middleware/web');

//이미지 저장 디렉터리 생성
fs.stat(imgPath, function (err) {
  if (err && err.code === 'ENOENT') {
    fs.mkdirSync(imgPath)
    logger.info('create image dir success')
  }
})

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imgPath);
    },
    filename: function (req, file, cb) {
      var fileName = file.originalname.replace(/ /g,"")
      cb(null, path.basename(fileName, path.extname(fileName)) + '-' + moment().format("YYYYMMDDHHmmss") + path.extname(fileName));
    }
  }),
}).single('image');

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "POST,PUT,GET,OPTIONS,DELETE,PATCH");
  next();
});

router.get('/image', (req, res, next) => {

  try {
    const imgList = []
    
    fs.readdir(imgPath, (err, files) => {

      if (err) {
        res.status(200).json({
          code: 400,
          message: err.message
        })
      } else {
        files.forEach(file => {
          imgList.push({
            fileName: process.env.IMAGE_URL + '/viewerImage/' + file,
            createdAt: path.basename(file, path.extname(file)).slice(-12)
          })
        });

        imgList.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return 1;
          }
          if (a.createdAt < b.createdAt) {
            return -1;
          }

          return 0;
        });

        res.status(200).json({
          code: 200,
          data: imgList
        })
      }
    });
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.post('/image/upload', verifyToken, (req, res, next) => {

  try {
    upload(req, res, function (err) {
      if (err) {
        res.status(200).json({
          code: 400,
          message: err.message
        })
      } else {
        res.status(200).json({
          code: 200
        })
      }
    })
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.post('/image/delete', verifyToken, (req, res, next) => {

  try {
    fs.unlink(path.join(imgPath, req.body.fileName), function (err) {
      if (err) {
        res.status(200).json({
          code: 400,
          message: err.message
        })
      } else {
        res.status(200).json({
          code: 200,
        })
      }
    })
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.get('/option', async (req, res, next) => {

  try {
    const result = await viewerOption.findOne()

    if (result) {
      res.status(200).json({
        code: 200,
        data: result
      })
    } else {
      res.status(200).json({
        code: 400,
        message: 'no data'
      })
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.post('/option/update', async (req, res, next) => {

  try {
    const result = await viewerOption.update({
      screenTitle: req.body.screenTitle,
      mainValue: req.body.mainValue,
      slideInterval: req.body.slideInterval,
      isMainDisplayed: req.body.isMainDisplayed,
      isAirkrDisplayed: req.body.isAirkrDisplayed,
      isCovidDisplayed: req.body.isCovidDisplayed,
      isImageDisplayed: req.body.isImageDisplayed,
    }, { where: {
      deviceId: 'any'
    }})

    if (result[0]) {
      res.status(200).json({
        code: 200,
        data: 'success'
      })
    } else {
      res.status(200).json({
        code: 400,
        message: 'fail'
      })
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

router.post('/option/airkr/update', async (req, res, next) => {

  try {
    const result = await viewerOption.update({
      airkrSi: req.body.airkrSi,
      airkrGu: req.body.airkrGu
    }, { where: {
      deviceId: 'any'
    }})

    if (result[0]) {
      res.status(200).json({
        code: 200,
        data: 'success'
      })
    } else {
      res.status(200).json({
        code: 400,
        message: 'fail'
      })
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(200).json({
      code: 500,
      message: "Server Error"
    })
  }
})

module.exports = router;

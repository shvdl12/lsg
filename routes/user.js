const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const user = require('../db/user');
const alarm = require('../db/alarm');
const authNumbers = require('../db/authNumbers');
const authSetting = require('../db/authSetting');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/web');
const moment = require('moment');
const logger = require('../logger.js')
const {createCode} = require('../utils');


router.post('/login', async function (req, res, next) {

  try {
    
    const result = await user.findOne({
      where: {
        userId: req.body.userId,
      }
    })

    if (result && bcrypt.compareSync(req.body.userPass, result.userPass)) {

      const resultAuth = await authSetting.findOne({
        where: {
          userId: req.body.userId,
        }
      })

      if (resultAuth.isWebUsed === 'Y') {
        await user.update({
          loginAt: moment().format('YYYYMMDDHHmmss')
        }, {
          where: {
            userId: req.body.userId,
          }
        })

        const token = jwt.sign({
          userId: req.body.userId,
        }, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRESIN,
          issuer: process.env.JWT_ISSUER,
        });

        return res.status(200).json({
          code: 200,
          message: "success",
          token
        })
      } else {
        res.status(200).json({
          code: 403,
          message: "사용 권한이 없습니다.\n문의바랍니다. 1566-4640",
          token: null
        })
      }
    } else {

      res.status(200).json({
        code: 404,
        message: "아이디 또는 비밀번호를 확인해 주세요.",
        token: null
      })
    }
  } catch (err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({
      message: err.message
    })
  }
});

router.post("/join", async function (req, res, next) {

  try {
    req.body.userPass = bcrypt.hashSync(req.body.userPass, 10);

    req.body.bizNum = req.body.bizNum[0] + '-'  + req.body.bizNum[1] + '-' + req.body.bizNum[2];
    await user.create(req.body)
    await authSetting.create({
      userId: req.body.userId,
      isWebUsed: 'N',
      isViewerUsed: 'N',
      isAppUsed: 'N',
      isVieweCount: 0
    })
    await alarm.create({
      userId: req.body.userId,
      alarmPower: 'N',
      alarmCycle: '10',
      alarmStandard: 'bad',
    })

    res.status(200).json({
      code: 200,
      message: "가입을 축하드립니다."
    })

  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(200).json({
        code: 400,
        message: "이미 사용중인 아이디 입니다."
      })
    } else {
      res.status(500).json({
        message: "회원가입에 실패 하였습니다."
      })
    }
  }
});

router.post("/sendAuthMessage", async function (req, res, next) {

  try {
    const request = require('request-promise');
    const authPass = Math.floor(Math.random() * (10000 - 1000)) + 1000
    const url = "https://rest.surem.com/sms/v1/json"
    const option = {

      method: "post",
      body: {
        "usercode": "suremtest",
        "deptcode": "IX-TEX-LC",
        "messages": [{
          "to": req.body.phoneNumber
        }],
        "text": "[코아미세]\n본인 인증 암호는 [" + authPass + "]입니다.",
        "from": "15664640"
      },
      json: true
    }

    result = await request.post(url, option)
    
    suremCode = result.code
    suremResult = result.results[0].result

    if (suremCode === '200' && suremResult === 'success') {
      res.status(200).json({
        code: 200,
        authPass: authPass
      })
    } else {

      res.status(200).json({
        code: 400,
        message: "send fail"
      })
    }
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: "server error"
    })
  }
});

function sendMsg(callphone, text) {
  const request = require("request")
  var postData = {
    usercode: 'suremtest',
    deptcode: 'IX-TEX-LC',
    messages: [{
      messaged_id: "1",
      to: callphone
    }],
    "text": text,
    from: "15884640"
  }
  var clientServerOptions = {
    uri: 'https://rest.surem.com/sms/v1/json',
    body: JSON.stringify(postData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  request(clientServerOptions, function (error, response) {
    console.log(error, response.body);
    return;
  });
}

router.post("/sendAuthMsg", async function (req, res) {
  try {
    let phoneNumber = req.body.phoneNumber

    let result;
    if (req.body.type === 'password') {
      result = await user.findOne({
        where: {
          userId: req.body.userId,
          phoneNumber: phoneNumber
        }
      })
    } else {
      result = await user.findOne({
        where: {
          userName: req.body.userName,
          phoneNumber: phoneNumber
        }
      })
    }
    
    // 인증 번호 테이블 Create
    if (result == null) {
      res.status(200).json({
        code: 400,
        message: 'Find Failed'
      })
    } else {
      var randomNumber = Math.floor(1000 + Math.random() * 9000);
      var text = "인증번호는 " + randomNumber + " 입니다."

      authNumbers.create({
        callphone: phoneNumber,
        reqphone: '15884640',
        authNumber: randomNumber,
        isUsed: 'N'
      })
      sendMsg(req.body.phoneNumber, text)
      res.status(200).json({
        code: 200,
        message: "success"
      })
    }
  } catch (err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      code: 500,
      message: "Server Error"
    });
  }
})

router.post("/authFindId", async function (req, res) {

  try {
    var callphone = req.body.callphone;
    var authNumber = req.body.authNumber;
  
    const authNumberResult = await authNumbers.findOne({
      where: {
        callphone: req.body.callphone,
        authNumber: req.body.authNumber,
        isUsed: 'N'
      },
      order: [
        ['id', 'DESC']
      ]
    })
  
    const userResult = await user.findOne({
      where: {
        userName: req.body.userName,
        phoneNumber: req.body.callphone
      }
    })
  
    if (authNumberResult === null) {
      res.status(200).json({
        code: 400,
        message: "Auth Number is incorrect"
      })
    } else {
      authNumbers.update({
          isUsed: 'Y'
        }, {
          where: {
            callphone: req.body.callphone
          }
        }).then((result) => {})
        .catch(err => {
          logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
        })
      res.status(200).json({
        code: 200,
        userId: userResult.dataValues.userId
      })
    }
  }
  catch(err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
  }
  
})

router.post("/authFindPassword", async function (req, res) {
  
  try {

    var phoneNumber = req.body.phoneNumber;
    var authNumber = req.body.authNumber;
    var userId = req.body.userId;
  
    var arr = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,~,`,!,@,#,$,%,^,&,*,(,),-,+,|,_,=,\,[,],{,},<,>,?,/,.,;".split(",");
    var randomPw = createCode(arr, 11);
    const authNumberResult = await authNumbers.findOne({
      where: {
        callphone: phoneNumber,
        authNumber: authNumber,
        isUsed: 'N'
      },
      order: [
        ['id', 'DESC']
      ]
    })
  
    if (authNumberResult === null) {
      
      res.status(200).json({
        code: 400,
        message: "Auth Number is incorrect"
      })
    } else {
  
      authNumbers.update({
          isUsed: 'Y'
        }, {
          where: {
            callphone: req.body.phoneNumber
          }
        }).then((result) => {
          res.json(result);
        })
        .catch(err => {
          logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
        })
  
      sendMsg(phoneNumber, '비밀번호는 ' + randomPw + ' 입니다.')
      randomPw = bcrypt.hashSync(randomPw, 10)
      user.update({
        userPass: randomPw
      }, {
        where: {
          userId: userId
        }
      })
      res.status(200).json({
        code: 200,
        message: 'success'
      })
    }

  }
  catch(err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
  }
})

router.post("/updateAccount", verifyToken, async function (req, res) {
  
  var editedAccount;
  if (req.body.userPass == null) {
    editedAccount = {
      email: req.body.email,
      userName: req.body.name,
      phoneNumber: req.body.phoneNumber
    }
  } else {
    editedAccount = {
      userPass: bcrypt.hashSync(req.body.userPass, 10),
      email: req.body.email,
      userName: req.body.name,
      phoneNumber: req.body.phoneNumber
    }
  }

  user.update(editedAccount, {
    where: {
      userId: req.userId
    }
  }).then((result) => {
    
    res.json({
      code: 200,
      message: 'success'
    })
  }).catch(err => {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.json({
      code: 400,
      message: 'Update Account Failed'
    })
  })
})

router.get("/getAccount", verifyToken, async function (req, res) {
  
  try {
    const accountData = await user.findOne({
      where: {
        userId: req.userId,
      }
    })
    res.status(200).json({
      code: 200,
      accountData: accountData.dataValues
    })
  }
  catch(err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: 'server error'
    })
  }
})

router.post("/withDrawal", verifyToken, async function (req, res) {
  
  authSetting.update({
    isWebUsed: 'N'
  }, {
    where: {
      userId: req.userId
    }
  }).then((result) => {
    
    res.json({
      code: 200,
      message: 'success'
    })
  }).catch(err => {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.json({
      code: 400,
      message: 'Update Account Failed'
    })
  })

})

router.get('/contract', verifyToken, async function(req,res) {
  
  try{

    const result = await user.findOne({
      attributes: ['startContract','endContract'],
      where: {
        userId: req.userId
      }
    })

    if(result.startContract && result.endContract) {
      res.status(200).json({
        code: 200,
        data: result
      })
    }
    else {
      res.status(200).json({
        code: 400,
        message: 'Contract Period Not Set'
      })
    }
    
  }catch(err) {

    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)

    res.status(500).json({
      message: err
    })
  }
})



module.exports = router;

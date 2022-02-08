
const express = require('express');
const router = express.Router();
const logger = require('../logger');

router.post("/login", async function(req, res){
  res.setHeader("Content-Type","application/json");
  try {
    
    
    const result = await user.findOne({
      where: {
        userId: req.body.userId,
      }
    })

    if(result && bcrypt.compareSync(req.body.userPass,result.userPass)) {

      await user.update({loginAt: moment().format('YYYYMMDDHHmmss')}, { where: {userId: req.body.userId,}})
      
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
          code: 404,
          message: "아이디 또는 비밀번호를 확인해 주세요.",
          token: null
        })
      }
    }
  catch(err) {
    logger.error(`${req.originalUrl} error ${JSON.stringify(err.message)}`)
    res.status(500).json({message: err})
  }
})


  
module.exports = router;
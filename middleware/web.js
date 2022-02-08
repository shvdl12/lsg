const jwt = require('jsonwebtoken');
const moment = require('moment')
const logger = require('../logger')


const verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY)

    const token = jwt.decode(req.headers.authorization)
    const diff = moment(token.exp * 1000).diff(moment(), 'seconds')

    req.userId = token.userId
    req.body.decodedTokenID = token.userId

    if (diff < 180) {

      const refreshToken = jwt.sign({
        userId: token.userId,
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRESIN,
        issuer: process.env.JWT_ISSUER,
      });
      req.token = refreshToken
    }
    
    return next();

  } catch (err) {
    
    logger.error(`verifyToken error ${JSON.stringify(err.message)}`)
    
    return res.status(401).json({
      code: 401,
      message: "Token is not valid"
    })
  }
}

module.exports = verifyToken;
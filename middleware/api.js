
const logger = require('../logger')
const api_key = require('../db/api_key');

const verifyServiceKey = async (req, res, next) => {
  try {
    const result = await api_key.findAll({
      where: {
        serviceKey: req.headers.servicekey
      }
    })

    if(result.length === 0) {
      throw new Error('Invalid Service Key')
    }
    
    return next();

  } catch (err) {
    
    logger.error(`checkKey error ${JSON.stringify(err.message)}`)
    return res.status(200).json({
      code: '1000',
      message: 'Invalid Service Key'
    })
    
  }
}

module.exports = verifyServiceKey;
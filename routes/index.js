const express = require('express');
const router = express.Router();
var path = require('path');

router.get('/message/direct_intl_return_lms.asp', function(req, res, next) {

  setTimeout(function() {
    res.send("ok")
  }, 10 * 60 * 1000)
  
})

module.exports = router;
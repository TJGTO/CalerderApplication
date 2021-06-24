var express = require('express')
  , router = express.Router()


router.get('/class-data', require('./getclassadate'));
router.post('/create-class-data', require('./createclass'))


module.exports = router;
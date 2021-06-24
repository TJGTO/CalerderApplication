var express = require('express')
  , router = express.Router()


router.get('/class-data', require('./getclassadate'));
router.post('/create-class-data', require('./createclass'))
router.post('/delete-class-data',require('./deleteClass'));
router.put('/update-class-data',require('./updateclass'));


module.exports = router;
var express = require('express')
  , router = express.Router()


router.use(require('./users'))
router.use(require('./Classes'))


module.exports = router
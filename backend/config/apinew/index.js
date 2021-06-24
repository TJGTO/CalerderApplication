var express = require('express')
  , router = express.Router()


router.use(require('./users'))
router.use(require('./Classes'))
// router.use(require('./users'))

module.exports = router
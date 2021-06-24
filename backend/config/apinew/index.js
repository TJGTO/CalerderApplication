var express = require('express')
  , router = express.Router()

router.use('/cars', require('./cars'))
router.use(require('./users'))
router.use(require('./roles'))
router.use(require('./Classes'))
// router.use(require('./users'))

module.exports = router
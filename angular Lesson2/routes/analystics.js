const controller = require('../controllers/analystics')
const express = require('express')
const router = express.Router()


router.get('/overview', controller.overviw)

router.get('/analytics', controller.analystics)

module.exports = router
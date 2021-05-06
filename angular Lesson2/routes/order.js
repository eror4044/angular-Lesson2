const controller = require('../controllers/order')
const express = require('express')
const router = express.Router()

router.get('/', controller.getAll)
router.post('/register', controller.create)



module.exports = router
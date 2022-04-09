const express = require('express')
const constrollersMerchant = require('../controllers/merchant')
const middleware = require('../middleware')
const router = express.Router()

router.post('/register', constrollersMerchant.registerMerchant)
router.post('/login', constrollersMerchant.loginMerchant)
router.delete('/', middleware.checkAuth, constrollersMerchant.deleteMerchant)

module.exports = router
const express = require('express')
const constrollersProduct = require('../controllers/product')
const middleware = require('../middleware')
const router = express.Router()

router.post('/', middleware.checkAuth, constrollersProduct.registerProduct)
router.put('/', middleware.checkAuth, constrollersProduct.updateProduct)
router.delete('/remove/:id', middleware.checkAuth, constrollersProduct.deleteProduct)
router.get('/', middleware.checkAuth, constrollersProduct.getAllProduct)
module.exports = router
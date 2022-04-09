const Product = require('../models/product')
var bcrypt = require("bcrypt")

class constrollersProduct {

  static async registerProduct (req, res) {
    if (!(req.body.name) || !(req.body.quantity) || !(req.body.price)){
      return res.status(400).json({ errorMessage: 'Check Your Parameter'});
    }
    Product.create(req.merchantId,req.body)
    res.status(201).json({})
  }

  static async updateProduct(req,res){
    if (!(req.body.id)){
        return res.status(400).json({ errorMessage: 'Check Your Parameter'});
    }
    const existingData = await Product.findById(req.body.id)
    if(existingData.length === 0){
      return res.status(400).json({ errorMessage: 'Product not found'});
    }
    if (existingData[0].merchant_id !== req.merchantId){
        return res.status(401).json({ errorMessage: 'Not Authorized'});
    }
    let name=existingData[0].name
    if (req.body.name){
        name=req.body.name
    }
    let quantity=existingData[0].quantity
    if (req.body.quantity){
        quantity=req.body.quantity
    }
    let price=existingData[0].price
    if (req.body.price){
        price=req.body.price
    }
    Product.update(req.body.id,name,quantity,price)
    res.status(200).json({})
  }

  static async deleteProduct(req,res){
    const existingData = await Product.findById(req.params.id)
    if(existingData.length === 0){
      return res.status(400).json({ errorMessage: 'Product not found'});
    }
    if (existingData[0].merchant_id !== req.merchantId){
        return res.status(401).json({ errorMessage: 'Not Authorized'});
    }
    Product.delete(req.params.id)
    res.status(200).json({})
  }

  static async getAllProduct(req,res){
    const existingData = await Product.getAllProductByMerhcantId(req.merchantId)
    res.status(200).json({listMerchant:existingData})
  }
}

module.exports = constrollersProduct
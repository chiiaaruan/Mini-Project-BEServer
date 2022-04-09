const Merchant = require('../models/merchant')
var bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

class constrollersMerchant {

  static async registerMerchant (req, res) {
    if (!(req.body.name) || !(req.body.password) || !(req.body.address) || !(req.body.phoneNumber)){
      return res.status(400).json({ errorMessage: 'Check Your Parameter'});
    }
    const existingData = await Merchant.findByName(req.body.name)
    if(existingData.length !== 0){
      return res.status(400).json({ errorMessage: 'Name already exist!'});
    }
    let hashPassword=bcrypt.hashSync(req.body.password,10)
    Merchant.create(req.body,hashPassword)
    res.status(201).json({})
  }

  static async loginMerchant(req,res) {
    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
      return res.status(400).json({ errorMessage: 'Missing Authorization Header' });
    }
    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const existingData = await Merchant.findByName(username)
    if(existingData.length === 0){
      return res.status(401).json({ errorMessage: 'Username or password invalid'});
    }
    const valid = await bcrypt.compare(password,existingData[0].password)
    if(valid){
      const token = jwt.sign({
        name: req.body.name,
        merchantId: existingData[0].id
      }, 'BelajarNodeJs')
      return res.status(200).json({ token: token});
    }else{
      return res.status(401).json({ errorMessage: 'Username or password invalid'});
    }
  }
  static async deleteMerchant(req,res){
    Merchant.deleteByMerchantId(req.merchantId)
    return res.status(200).json({})
  }
}

module.exports = constrollersMerchant
require("dotenv").config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4111
const merchant = require('./routes/merchant')
const product = require('./routes/product')

let bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('This is Chia!')
})

app.use('/merchant', merchant)
app.use('/product', product)


app.listen(PORT, console.log("Server done start for port:" +PORT))


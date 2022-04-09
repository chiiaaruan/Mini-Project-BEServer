const { response } = require('express')
const { route } = require('express/lib/application')
const fs = require('fs')
const db = require('../config/db')

class Product {
    static create(merchantId,data) {
        const query = `INSERT into product (id, merchant_id, name, quantity, price) VALUES(UUID(),?,?,?,?)`
        db.query(query, [merchantId, data.name, data.quantity, data.price], function(err) {
            if (err) {
                throw(err)
            }
        })
    }

    static findById(id) {
        return new Promise (function(resolve, reject) {
            const query = `SELECT * from product WHERE id='${id}'`
            db.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }

    static getAllProductByMerhcantId(merchantId){
        return new Promise (function(resolve, reject) {
            const query = `SELECT * from product WHERE merchant_id='${merchantId}'`
            db.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
    
    static update(id,name,quantity,price){
        const query = `UPDATE product SET name=?, quantity=?,price=? where id=?`
        db.query(query, [name,quantity,price,id], function(err) {
            if (err) {
                throw(err)
            }
        })
    }

    static delete(id){
        const query = `DELETE FROM product WHERE id=?`
        db.query(query, [id], function(err) {
            if (err) {
                throw(err)
            }
        })
    }
}
module.exports = Product
const { response } = require('express')
const { route } = require('express/lib/application')
const fs = require('fs')
const db = require('../config/db')

class Merchant {
    static create(data,hashPassword) {
        const query = `INSERT into merchant (id, password, name, address, join_date, phone_number) VALUES(UUID(),?,?,?,NOW(),?)`
        db.query(query, [hashPassword, data.name, data.address, data.phoneNumber], function(err) {
            if (err) {
                throw(err)
            }
        })
    }

    static findByName(name) {
        return new Promise (function(resolve, reject) {
            const query = `SELECT * from merchant WHERE name='${name}'`
            db.query(query, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        }) 
    }

    static deleteByMerchantId(merchantId){
        const query = `DELETE FROM merchant where id=?`
        db.query(query, [merchantId], function(err) {
            if (err) {
                throw(err)
            }
        })
    }
}
module.exports = Merchant
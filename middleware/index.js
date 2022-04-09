const jwt = require('jsonwebtoken')

class Middleware {
    static checkAuth(req, res, next) {
        // check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            return res.status(400).json({ errorMessage: 'Missing Authorization Header' });
        }
        const jwtTokenUser =  req.headers.authorization.split(' ')[1];
        const validate = jwt.verify(jwtTokenUser, 'BelajarNodeJs')
        if (validate) {
            const jsonBody=jwt.decode(jwtTokenUser, {
                complete: true
            })
            req.merchantId=jsonBody.payload.merchantId
            next()
        } else {
            return res.status(401).json({ errorMessage: 'Not Authorized'});
        }
    }
}

module.exports = Middleware
// Import Package
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')

const config = require('../utils/config')

// Login Validator to Check username and password exist
const loginValidator = [
    check('username').isString().isLength({min : 1}),
    check('password').isString().isLength({min : 1}),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send(errors)
    }
]

const authenticate = (req, res, next) => {
    const bearerToken = req.headers.authorization || req.cookies.authorization
    const token = bearerToken?.split(' ')[1]
    if (!token) return res.status(401).send({
        status : 'fail',
        msg : 'Token Tidak ditemukan'
    })

    jwt.verify(token, config.Acces_Token, (err, result) => {
        if (err) return res.status(403).send({
          status: 'fail',
          msg: 'Token Tidak Valid',
        })
        next()
    })
}

module.exports = {loginValidator, authenticate}
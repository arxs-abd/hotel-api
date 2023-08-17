// Import Package
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

// Function For Url /api/login
const login = (req, res) => {
    const {username, password} = req.body
    if (username !== 'admin' || password !== config.Password) return res.status(403).send({
        status : 'fail',
        msg : 'Username atau Password Salah'
    })
    const token = jwt.sign({user : 'admin'}, config.Acces_Token)
    return res.send({
        status : 'success',
        token
    })
}

module.exports = {login}
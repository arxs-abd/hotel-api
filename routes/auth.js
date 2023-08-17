// Import Package
const express = require('express')

// Import Controller
const { login } = require('../controller/auth')

// Import Middleware
const {loginValidator} = require('../middleware/auth')

const router = express.Router()

router.post('/api/login', loginValidator, login)

module.exports = router
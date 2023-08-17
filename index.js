// Import Package
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// Import Routes
const routeAuth = require('./routes/auth')
const routeRoom = require('./routes/room')

const app = express()
const port = process.env.PORT || 3000

// Using Middleware
app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(express.json())

// Using Routes
app.use(routeAuth)
app.use(routeRoom)

const server = app.listen(port, () => {})

module.exports = server
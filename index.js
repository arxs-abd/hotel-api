// Import Package
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

// Import Routes
const routeAuth = require('./routes/auth')
const routeRoom = require('./routes/room')

// Import Config
const config = require('./utils/config')

// Init App
const app = express()
const port = process.env.PORT || 3000

// Using Middleware
app.use(cors({
  origin: '*'
}))
app.use(cookieParser())
app.use(express.json())

// Using DB
mongoose.connect(config.MongoDB_url, {
  useNewUrlParser : true, 
  useUnifiedTopology : true
})

// Using Routes
app.use(routeAuth)
app.use(routeRoom)

const server = app.listen(port, () => {})

module.exports = server
// Import Package
const express = require('express')

// Import Controller
const {getAllRoom, addRoom, getRoomByID, deleteRoom, updateRoom} = require('../controller/room')

// Import Middleware
const {authenticate} = require('../middleware/auth')
const {addRoomValidate} = require('../middleware/room')


const router = express.Router()

router.get('/api/room', getAllRoom)
router.post('/api/room', authenticate, addRoomValidate, addRoom)
router.get('/api/room/:id', getRoomByID)
router.put('/api/room/:id', authenticate, updateRoom)
router.delete('/api/room/:id', authenticate, deleteRoom)

module.exports = router
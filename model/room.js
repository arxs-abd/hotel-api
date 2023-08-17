// Import Package
const mongoose = require('mongoose')

// Schema For Room Table
const roomSchema = new mongoose.Schema({
    id_room : String,
    name : String,
    price : Number,
    description : String,
    photo : String,
}, { versionKey: false })

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
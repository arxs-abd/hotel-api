// Import Model
const Room = require('../model/room')

// Function For Url GET /api/room
const getAllRoom = (req, res) => {
    return res.status(200).send({
        status : 'success',
        data : []
    })
}

// Function For Url POST /api/room
const addRoom = async (req, res) => {
    const {name, price, description, photo} = req.body
    const data = {name, price, description, photo}
    const newRoom = new Room(data)

    await newRoom.save().catch(err => {
        return res.status(500).send({
            status : 'fail',
            msg : err
        })
    })

    return res.status(201).send({
        status : 'success',
        msg : 'Room Berhasil Ditambah',
        id : newRoom._id,
        data
    })
}

// Function For Url GET /api/room/:id
const getRoomByID = async (req, res) => {
    const {id} = req.params
    const room = await Room.findOne({_id : id}).catch(err => {
        return res.status(500).send({
            status : 'fail',
            msg : 'Gagal Mendapatkan Room'
        })
    })

    return res.status(200).send({
        status : 'success',
        msg : 'Berhasil Mendapatkan Room',
        data : room
    })
}

// Function For Url PUT /api/room/:id
const updateRoom = async (req, res) => {
    const {name, price, description, photo} = req.body
    const {id} = req.params

    const room = await Room.findOne({_id : id}).catch(err => {
        return res.status(500).send({
            status : 'fail',
            msg : 'Gagal Melakukan Update Room'
        })
    })

    room.name = name ?? room.name
    room.price = price ?? room.price
    room.description = description ?? room.description
    room.photo = photo ?? room.photo

    await room.save().catch(err => {
        return res.status(500).send({
            status : 'fail',
            msg : 'Gagal Melakukan Update Room'
        })
    })

    return res.status(200).send({
        status : 'success',
        msg : 'Berhasil Melakukan Update Room'
    })
}

// Function For Url DELETE /api/room/:id
const deleteRoom = async (req, res) => {
    const {id} = req.params

    await Room.findOneAndDelete({_id : id}).catch(err => {
        return res.status(500).send({
            status : 'fail',
            msg : 'Gagal Melakukan Delete Room'
        })
    })

    return res.status(200).send({
        status : 'success',
        msg : 'Berhasil Melakukan Delete Room'
    })
}

module.exports = {getAllRoom, addRoom, updateRoom, getRoomByID, deleteRoom}
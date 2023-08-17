const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../index')
const config = require('../utils/config')

const roomData = {
    name : 'Reguler Room',
    price : 450000,
    description : 'This room have 1 bed with regular size with 1 bathroom',
    photo : 'https://www.italianbark.com/wp-content/uploads/2018/01/Muji-Hotel-Shenzhen-02-hotel-room-design-trends-italianbark-.jpg'
}

const updateRoomData = {
    name : 'Suite Room',
    price : 4500000,
    description : 'This room have 3 bed with King size with 2 bathroom with a bathub',
    photo : 'https://www.dictio.id/uploads/db3342/optimized/3X/a/5/a5b4002e3a69d1c79852aa0030991fafc53797a1_2_1035x525.jpeg'
}

const userData = {
    username : 'admin',
    password : config.Password
}

let token
const fakeToken = 'Ba78Aa112C12101212T121AuwNmbvqGwqwqJdzxwnjc1Ndw221dsdkldfldfklsG'

let idRoom


beforeEach(async () => {
    await mongoose.connect(config.MongoDB_url)
})

afterEach(async () => {
    await mongoose.connection.close()
    app.close()
})


// Testing Room
describe('Room API Testing', () => {
    // Testing /api/login
    it('Should Get All Room In Database', async () => {
        const res = await request(app).get('/api/room')
        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
    })
    it('Should Fail to Add Room Because Not Login', async () => {
        const res = await request(app).post('/api/room').send(roomData)
        expect(res.statusCode).toBe(401)
        expect(res.body.status).toBe('fail')
    })
    it('Should Fail to Add Room Because Access Token Invalid', async () => {
        const res = await request(app).post('/api/room').set('Cookie', 'authorization=' + fakeToken).send(roomData)
        expect(res.statusCode).toBe(403)
        expect(res.body.status).toBe('fail')
    })
    it('Should Fail to Add Room Because Room Data is Not Complete', async () => {
        const resLogin = await request(app).post('/api/login').send(userData)
        token = resLogin.body.token

        delete roomData.price

        const res = await request(app).post('/api/room').set('Cookie', 'authorization=' + token).send(roomData)
        expect(res.statusCode).toBe(400)
        expect(res.body.status).toBe('fail')
    })
    it('Should Success to Add Room', async () => {
        roomData.price = 450000

        const res = await request(app).post('/api/room').set('Cookie', 'authorization=' + token).send(roomData)

        idRoom = res.body.id

        expect(res.statusCode).toBe(201)
        expect(res.body.status).toBe('success')
        expect(res.body.data).toEqual(roomData)
        expect(typeof res.body.id).toBe('string')
    })
    it('Should Get Room By ID', async () => {
        roomData._id = idRoom
        const res = await request(app).get('/api/room/' + idRoom)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')
        expect(res.body.data).toEqual(roomData)
    })
    it('Should Update Room By ID', async () => {
        updateRoomData._id = idRoom
        const res = await request(app).put('/api/room/' + idRoom).set('Cookie', 'authorization=' + token).send(updateRoomData)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')
    })
    it('Should Get Updated Room By ID', async () => {
        const res = await request(app).get('/api/room/' + idRoom)
        
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')
        expect(res.body.data).toEqual(updateRoomData)
    })
    // it ('Should Delete Room By ID', async () => {
    //     const res = await request(app).delete('/api/room/' + idRoom).set('Cookie', 'authorization=' + token)

    //     expect(res.statusCode).toBe(200)
    //     expect(res.body.status).toBe('success')
    // })
})
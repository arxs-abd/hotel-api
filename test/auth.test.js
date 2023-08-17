const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../index')
const config = require('../utils/config')


beforeEach(async () => {
    await mongoose.connect(config.MongoDB_url)
})

afterEach(async () => {
    await mongoose.connection.close()
    app.close()
})

// Testing Auth
describe('Authentication Testing', () => {
    // Testing /api/login
    it('Should Fail Because Username is Empty', async () => {
        const res = await request(app).post('/api/login').send({
            username : '',
            password : '12435678'
        })
        expect(res.statusCode).toBe(400)
    })
    it('Should Fail Because Password Is Wrong', async () => {
        const res = await request(app).post('/api/login').send({
            username : 'admin',
            password : '12345679'
        })
        expect(res.statusCode).toBe(403)
        expect(res.body.status).toBe('fail')
    })
    it('Should Login in App', async () => {
        const res = await request(app).post('/api/login').send({
            username : 'admin',
            password : '12345678'
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe('success')
        expect(typeof res.body.token).toBe('string')
    })
})
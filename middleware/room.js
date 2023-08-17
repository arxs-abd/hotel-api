// Import Package
const {check, validationResult} = require('express-validator')

const config = require('../utils/config')

const addRoomValidate = [
    check('name').isString().isLength({min : 1}),
    check('price').isNumeric(),
    check('description').isString().isLength({min : 1}),
    check('photo').isString().isLength({min : 1}),
    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) return next()
        return res.status(400).send({
            status : 'fail',
            ...errors
        })
    }
]

module.exports = {addRoomValidate}
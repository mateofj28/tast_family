const mongo = require('mongoose')

const userSchema = mongo.Schema({
    name: String,
    email: String,
    phone: String,
    password: String
})

module.exports = mongo.model('user', userSchema)
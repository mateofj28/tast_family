const mongo = require('mongoose')

const tastSchema = mongo.Schema({
    name: String,
    des: String,
    state: Boolean,    
})

module.exports = mongo.model('task', tastSchema)
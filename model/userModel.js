const mongoose = require('mongoose')

// 创建一个schema
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    create_time: Number
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel

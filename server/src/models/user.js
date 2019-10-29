const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String
}, {
  timeStamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User

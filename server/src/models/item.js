const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item

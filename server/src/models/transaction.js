const mongoose = require('mongoose')
const { Schema } = mongoose

const transactionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  patientId: {
    type: Schema.ObjectId,
    ref: 'Patient',
    required: true
  },
  itemId: {
    type: Schema.ObjectId,
    ref: 'Item'
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dateStart: String,
  dateEnd: String
}, {
  timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction

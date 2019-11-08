const mongoose = require('mongoose')
const { Schema } = mongoose
// const { GraphQLDateTime } = require('graphql-iso-date')

const transactionSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  item: {
    type: Schema.ObjectId,
    ref: 'Item'
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

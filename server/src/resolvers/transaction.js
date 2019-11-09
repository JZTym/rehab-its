const { Transaction, Item } = require('../models')
const { UserInputError, ValidationError } = require('apollo-server-express')

const {
  TRANSACTION_NO_CATEGORY,
  TRANSACTION_NO_ITEM,
  TRANSACTION_NO_PRICE,
  TRANSACTION_NO_DURATION_DATE,
  TRANSACTION_INVALID_ITEM,
  TRANSACTION_NOT_FOUND,
  TRANSACTION_NO_DOCTOR_NAME
} = require('../error')

module.exports = {
  Transaction: {
    dateStart: (root) => (!root.dateStart) ? null : (new Date(root.dateStart)).toUTCString(),
    dateEnd: (root) => (!root.dateEnd) ? null : (new Date(root.dateEnd)).toUTCString(),
    createdAt: (root) => (!root.createdAt) ? null : (new Date(root.createdAt)).toUTCString(),
    updatedAt: (root) => (!root.updatedAt) ? null : (new Date(root.updatedAt)).toUTCString()
  },

  Query: {
    transactions: () => {
      return Transaction.find()
    }
  },

  Mutation: {
    addTransaction: async (_, {
      category,
      item: itemID,
      name,
      price,
      dateStart,
      dateEnd
    }) => {
      if (!category) {
        throw new ValidationError(TRANSACTION_NO_CATEGORY)
      }
      if (category === 'CLINIC' && !itemID) {
        throw new ValidationError(TRANSACTION_NO_ITEM)
      }
      if (category !== 'CLINIC' && !price) {
        throw new ValidationError(TRANSACTION_NO_PRICE)
      }
      if (category === 'TREATMENT' && !(dateStart && dateEnd)) {
        throw new ValidationError(TRANSACTION_NO_DURATION_DATE)
      }
      if (category === 'TREATMENT' && !name) {
        throw new ValidationError(TRANSACTION_NO_DOCTOR_NAME)
      }

      if (
        category !== 'TREATMENT' &&
        category !== 'CLINIC'
      ) {
        name = category
      }

      if (itemID) {
        const item = await Item.findOne({ _id: itemID })
        if (!item) {
          throw new ValidationError(TRANSACTION_INVALID_ITEM)
        }
        name = item.name
        price = item.price
      }

      const transaction = new Transaction({
        category: category,
        item: itemID,
        name: name,
        price: price,
        dateStart: dateStart,
        dateEnd: dateEnd
      })

      try {
        await transaction.save()
        return transaction
      } catch (err) {
        throw new Error(err)
      }
    },
    updateTransaction: async (_, {
      id,
      category,
      name,
      item: itemID,
      price,
      dateStart,
      dateEnd
    }) => {
      const transaction = await Transaction.findOne({ _id: id })
      if (!transaction) {
        throw new UserInputError(TRANSACTION_NOT_FOUND)
      }

      if (!category) {
        throw new ValidationError(TRANSACTION_NO_CATEGORY)
      }
      if (category === 'CLINIC' && !itemID) {
        throw new ValidationError(TRANSACTION_NO_ITEM)
      }
      if (category !== 'CLINIC' && !price) {
        throw new ValidationError(TRANSACTION_NO_PRICE)
      }
      if (category === 'TREATMENT' && !(dateStart && dateEnd)) {
        throw new ValidationError(TRANSACTION_NO_DURATION_DATE)
      }

      if (itemID && !price) {
        const item = await Item.findOne({ _id: itemID })
        if (!item) {
          throw new ValidationError(TRANSACTION_INVALID_ITEM)
        }
        price = item.price
      }

      try {
        await transaction.save()
        return transaction
      } catch (err) {
        throw new Error(err)
      }
    },
    removeTransaction: async (_, { id }) => {
      const transaction = await Transaction.findOne({ _id: id })

      try {
        transaction.remove()
        return true
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

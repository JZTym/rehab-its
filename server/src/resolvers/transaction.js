const { Transaction, Item } = require('../models')
const { UserInputError, ValidationError } = require('apollo-server-express')
const { GraphQLDateTime } = require('graphql-iso-date')

const {
  TRANSACTION_NO_CATEGORY,
  TRANSACTION_NO_ITEM,
  TRANSACTION_NO_PRICE,
  TRANSACTION_NO_DURATION_DATE,
  TRANSACTION_INVALID_ITEM,
  TRANSACTION_NOT_FOUND
} = require('../error')

module.exports = {
  DateTime: GraphQLDateTime,

  Transaction: {
    dateStartStr: (root) => (!root.dateStart) ? null : Date(root.dateStart),
    dateEndStr: (root) => (!root.dateEnd) ? null : Date(root.dateEnd),
    createdAtStr: (root) => (!root.createdAt) ? null : Date(root.createdAt),
    updatedAtStr: (root) => (!root.updatedAt) ? null : Date(root.updatedAt)
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

      if (itemID && !price) {
        const item = await Item.findOne({ _id: itemID })
        if (!item) {
          throw new ValidationError(TRANSACTION_INVALID_ITEM)
        }
        price = item.price
      }

      const transaction = new Transaction({
        category: category,
        item: itemID,
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

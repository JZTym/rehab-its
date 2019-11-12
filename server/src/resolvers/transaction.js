const { Patient, Transaction, Item } = require('../models')
const { UserInputError, ValidationError } = require('apollo-server-express')

const {
  TRANSACTION_NO_CATEGORY,
  TRANSACTION_NO_PATIENT,
  TRANSACTION_NO_ITEM,
  TRANSACTION_NO_PRICE,
  TRANSACTION_NO_DURATION_DATE,
  TRANSACTION_INVALID_ITEM,
  TRANSACTION_NOT_FOUND,
  TRANSACTION_NO_DOCTOR_NAME
} = require('../error')

module.exports = {
  Transaction: {
    patientName: async (root) => {
      if (!root.patientId) {
        return null
      }
      const patient = await Patient.findOne({ _id: root.patientId })
      return patient.name
    },
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
      patientId,
      itemId,
      name,
      price,
      dateStart,
      dateEnd
    }) => {
      if (!category) {
        throw new ValidationError(TRANSACTION_NO_CATEGORY)
      }
      if (!patientId) {
        throw new ValidationError(TRANSACTION_NO_PATIENT)
      }
      if (category === 'CLINIC' && !itemId) {
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

      if (itemId) {
        const item = await Item.findOne({ _id: itemId })
        if (!item) {
          throw new ValidationError(TRANSACTION_INVALID_ITEM)
        }
        name = item.name
        price = item.price
      }

      const transaction = new Transaction({
        category,
        patientId,
        itemId,
        name,
        price,
        dateStart,
        dateEnd
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
      itemId,
      price,
      dateStart,
      dateEnd
    }) => {
      const transaction = await Transaction.findOne({ _id: id })
      if (!transaction) {
        throw new UserInputError(TRANSACTION_NOT_FOUND)
      }
      if (category === 'CLINIC' && !itemId) {
        throw new ValidationError(TRANSACTION_NO_ITEM)
      }
      if (category !== 'CLINIC' && !price) {
        throw new ValidationError(TRANSACTION_NO_PRICE)
      }
      if (category === 'TREATMENT' && !(dateStart && dateEnd)) {
        throw new ValidationError(TRANSACTION_NO_DURATION_DATE)
      }

      if (itemId && !price) {
        const item = await Item.findOne({ _id: itemId })
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

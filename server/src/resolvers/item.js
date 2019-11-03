const { Item } = require('../models')
const { UserInputError, ValidationError } = require('apollo-server-express')

const {
  ITEM_ALREADY_EXISTS,
  ITEM_DOESNT_EXIST,
  ITEM_NOTHING_TO_UPDATE
} = require('../error')

module.exports = {
  Query: {
    items: () => {
      return Item.find()
    }
  },

  Mutation: {
    addItem: async (_, { name, amount, price }) => {
      const existingItem = await Item.findOne({ name })
      if (existingItem) {
        throw new ValidationError(ITEM_ALREADY_EXISTS)
      }

      const item = new Item({
        name: name,
        amount: amount,
        price: price
      })

      try {
        item.save()
        return item
      } catch (err) {
        throw new Error(err)
      }
    },
    updateItem: async (_, { id, name, amount, price }) => {
      const item = await Item.findOne({ _id: id })
      if (!item) {
        throw new ValidationError(ITEM_DOESNT_EXIST)
      }

      if (!name && !amount && !price) {
        throw new UserInputError(ITEM_NOTHING_TO_UPDATE)
      }

      // Update the item
      if (name) { item.name = name }
      if (amount) { item.amount = amount }
      if (price) { item.price = price }

      try {
        item.save()
        return item
      } catch (err) {
        throw new Error(err)
      }
    },
    removeItem: async (_, { id }) => {
      const item = await Item.findOne({ _id: id })
      try {
        item.remove()
        return true
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}

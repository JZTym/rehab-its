const { hash, compare } = require('bcryptjs')
const { UserInputError } = require('apollo-server-express')

const { User } = require('../models')
const { HASH_SALT } = require('../config')

const INVALID_USER_OR_PASS = 'Invalid username and/or password'

module.exports = {
  Query: {
    me: (root, args, context, info) => {
      // TODO: fix this
      return null
    },
    users: () => {
      return User.find()
    }
  },

  Mutation: {
    signup: async (_, {
      email,
      name,
      password
    }) => {
      // Hash the password
      const passHash = await hash(password, HASH_SALT)

      const user = new User({
        email: email,
        name: name,
        password: passHash
      })

      user.save()
      return user
    },
    login: async (_, {
      email,
      password
    }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError(INVALID_USER_OR_PASS)
      }

      const valid = await compare(password, user.password)
      if (!valid) {
        throw new UserInputError(INVALID_USER_OR_PASS)
      }

      // Login successful

      return user
    },
    removeUser: async (_, { id }) => {
      await User.findByIdAndDelete(id)
      return true
    }
  }
}

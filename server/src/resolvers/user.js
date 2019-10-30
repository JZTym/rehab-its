const { hash, compare } = require('bcryptjs')
const { UserInputError, ValidationError, AuthenticationError } = require('apollo-server-express')

const { User } = require('../models')
const { HASH_SALT_CYCLES } = require('../config')
const { createTokens } = require('../auth')

const { INVALID_USER_OR_PASS, NOT_AUTHENTICATED } = require('../error')

module.exports = {
  Query: {
    me: (_, __, { req }) => {
      // TODO: fix this
      if (!req.id) {
        throw new AuthenticationError(NOT_AUTHENTICATED)
      }
      return User.findById(req.id)
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
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        throw new ValidationError('Email address is already used!')
      }

      // Hash the password
      const passHash = await hash(password, Number.parseInt(HASH_SALT_CYCLES))

      const user = await (new User({
        email: email,
        name: name,
        password: passHash
      }))

      try {
        await user.save()
        return user
      } catch (err) {
        console.log(err)
      }
      return null
    },
    login: async (_, {
      email,
      password
    }, { res }) => {
      const user = await User.findOne({ email })
      if (!user) {
        throw new UserInputError(INVALID_USER_OR_PASS)
      }

      const valid = await compare(password, user.password)
      if (!valid) {
        throw new UserInputError(INVALID_USER_OR_PASS)
      }

      // Login successful
      const { accessToken, refreshToken } = createTokens(user)

      res.cookie('rid', refreshToken)
      res.cookie('aid', accessToken)

      return {
        accessToken: accessToken
      }
    },
    // TODO: Invalidate tokens
    invalidateTokens: async (_, __, { req, res }) => {
      if (!req.id) {
        return false
      }

      const user = User.findOne({ id: req.id })
      if (!user) {
        return false
      }

      // Clear the cookies
      res.clearCookie('aid')
      res.clearCookie('rid')
    },
    removeUser: async (_, { id }) => {
      await User.findByIdAndDelete(id)
      return true
    }
  }
}

const { User } = require('../models')

module.exports = {
  Query: {
    me: (root, args, context, info) => {
      // TODO: fix this
      return null
    },
    users: () => {
      return User.find({})
    }
  },

  Mutation: {
    createUser: (_, {
      email,
      name,
      password
    }) => {
      const user = new User({
        email: email,
        name: name,
        password: password
      })

      user.save()

      return user
    }
  }
}

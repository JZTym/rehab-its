const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    #TODO: Add mutations
    createUser(
      email: String!
      name: String!
      password: String!
    ): User
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`

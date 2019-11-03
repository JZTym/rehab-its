const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    me: User
    user (id: ID!): User
    users: [User!]!
  }

  extend type Mutation {
    #TODO: Add mutations
    signup (
      email: String!
      name: String!
      password: String!
    ): User
    login (
      email: String!
      password: String!
    ): LoginResponse
    invalidateTokens: Boolean
    removeUser (
      id: ID!
    ): Boolean
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  type LoginResponse {
    accessToken: String!
  }
`

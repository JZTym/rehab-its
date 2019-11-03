const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    items: [Item!]!
  }

  extend type Mutation {
    addItem (
      name: String!
      amount: Int!
      price: Float!
    ): Item
    updateItem (
      id: ID!
      name: String
      amount: Int
      price: Float
    ): Item
    removeItem (id: ID!): Boolean
  }

  type Item {
    id: ID!
    name: String!
    amount: Int!
    price: Float!
  }
`

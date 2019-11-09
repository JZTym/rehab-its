const { gql } = require('apollo-server-express')

module.exports = gql`    
  extend type Query {
    transactions: [Transaction!]!
  }

  extend type Mutation {
    addTransaction (
      category: ItemCategory!
      item: ID
      name: String
      price: Float
      dateStart: String
      dateEnd: String
    ): Transaction
    updateTransaction (
      id: ID!
      category: ItemCategory
      item: ID
      name: String
      price: Float
      dateStart: String
      dateEnd: String
    ): Transaction
    removeTransaction (id: ID!): Boolean
  }

  type Transaction {
    id: ID!
    category: ItemCategory!
    item: ID
    name: String!
    price: Float!
    dateStart: String
    dateEnd: String
    createdAt: String
    updatedAt: String
  }

  enum ItemCategory {
    TREATMENT
    CHECKUP
    LABORATORY
    CLINIC
    LAUNDRY
    HAIRCUT
    SERVICEFEE
    ASSERTION
  }
`

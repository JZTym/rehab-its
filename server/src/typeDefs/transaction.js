const { gql } = require('apollo-server-express')

module.exports = gql`
  scalar DateTime
    
  extend type Query {
    transactions: [Transaction!]!
  }

  extend type Mutation {
    addTransaction (
      category: ItemCategory!
      item: ID
      price: Float
      dateStart: DateTime
      dateEnd: DateTime
    ): Transaction
    updateTransaction (
      id: ID!
      category: ItemCategory
      item: ID
      price: Float
      dateStart: DateTime
      dateEnd: DateTime
    ): Transaction
    removeTransaction (id: ID!): Boolean
  }

  type Transaction {
    id: ID!
    category: ItemCategory!
    item: ID
    price: Float!
    dateStart: DateTime
    dateEnd: DateTime
    createdAt: DateTime
    updatedAt: DateTime
    dateStartStr: String
    dateEndStr: String
    createdAtStr: String
    updatedAtStr: String
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

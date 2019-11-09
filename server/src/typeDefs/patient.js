const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    patients: [Patient!]!
  }

  extend type Mutation {
    addPatient (
      name: String!
      dateStart: String!
    ): Patient
    updatePatient (
      id: ID!
      name: String
      dateStart: String
    ): Patient
    removePatient (id: ID!): Boolean
  }

  type Patient {
    id: ID!
    name: String!
    dateStart: String!
  }
`

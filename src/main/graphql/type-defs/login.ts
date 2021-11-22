import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    login (email: String!, pasword: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`

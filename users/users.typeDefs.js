import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    name: String!
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createAccount(
      name: String!
      userName: String!
      email: String!
      password: String!
    ): User
    login(userName: String!, password: String!): LoginResult!
  }
  type Query {
    seeProfile(userName: String!): User
  }
`;

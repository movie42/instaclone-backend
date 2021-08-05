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
`;

import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createAt: String!
    updateAt: String!
    bio: String
    avatar: Upload
  }
`;

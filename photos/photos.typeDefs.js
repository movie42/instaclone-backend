import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User
    file: String!
    caption: String
    hashtag: [Hashtag]
    createAt: String!
    updateAt: String!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createAt: String!
    updateAt: String!
  }
`;

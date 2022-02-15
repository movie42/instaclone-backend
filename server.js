require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQ0OTA2Mzc2fQ.FfDYgrBZHDHKZZi55YJShpF9d8sSr-9U2ROFWbCBJ7c",
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`😀 Server is running on http://localhost:${PORT}`));

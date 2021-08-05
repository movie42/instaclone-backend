import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { name, userName, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });
        if (existingUser) {
          throw new Error("사용자이름 혹은 이메일이 이미 존재합니다.");
        }
        const hashed = await bcrypt.hash(password, 10);
        return client.user.create({
          data: { userName, email, name, password: hashed },
        });
      } catch (error) {
        return error;
      }
    },
  },
};

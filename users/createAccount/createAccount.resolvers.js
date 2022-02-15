import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, userName, email, password },
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ userName }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("이미 존재하는 사용자입니다.");
        }

        const userPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            firstName,
            lastName,
            userName,
            email,
            password: userPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};

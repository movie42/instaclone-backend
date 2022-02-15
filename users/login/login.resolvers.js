import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { userName, password }) => {
      const user = await client.user.findFirst({
        where: {
          userName,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다.",
        };
      }

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        return {
          ok: false,
          error: "비밀번호가 틀렸습니다.",
        };
      }

      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};

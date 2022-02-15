import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password },
      { token },
    ) => {
      const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      let hashPassword = null;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }

      const updateUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          userName,
          email,
          ...(hashPassword && { password: hashPassword }),
        },
      });

      if (updateUser.id) {
        return { ok: true };
      } else {
        return {
          ok: false,
          error: "사용자 정보를 바꿀 수 없습니다.",
        };
      }
    },
  },
};

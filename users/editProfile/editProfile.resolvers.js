import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, userName, email, password },
    ) => {
      let hashPassword = null;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }

      const updateUser = await client.user.update({
        where: {
          id: 2,
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

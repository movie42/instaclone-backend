import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { userName }, { loggedInUser }) => {
      const existUser = await client.user.findUnique({
        where: {
          userName,
        },
      });

      if (!existUser) {
        return {
          ok: false,
          error: "사용자가 존재하지 않습니다.",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            connect: {
              userName,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};

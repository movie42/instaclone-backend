import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { userName }, { loggedInUser }) => {
        const existUser = await client.user.findUnique({
          where: {
            userName,
          },
        });
        if (!existUser) {
          return {
            ok: false,
            error: "사용자를 언팔로우 할 수 없습니다.",
          };
        }
        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                userName,
              },
            },
          },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};

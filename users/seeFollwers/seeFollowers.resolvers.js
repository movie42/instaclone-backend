import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const existUser = await client.user.findUnique({
        where: {
          userName,
        },
        select: {
          id: true,
        },
      });

      if (!existUser) {
        return {
          ok: false,
          error: "사용자를 찾을 수 없습니다.",
        };
      }
      const followers = await client.user
        .findUnique({
          where: { userName },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: {
          following: { some: { userName } },
        },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

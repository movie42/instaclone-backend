import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const aFollwers = await client.user
        .findUnique({
          where: { userName },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      return {
        ok: true,
        followers,
      };
    },
  },
};

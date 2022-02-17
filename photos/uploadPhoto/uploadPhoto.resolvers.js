import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagsObjs = [];

        if (caption) {
          const hashtags = caption.match(/#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g);
          hashtagsObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return client.photo.create({
          data: {
            file,
            caption,
            ...(hashtagsObjs.length > 0 && {
              hashtag: {
                connectOrCreate: hashtagsObjs,
              },
            }),
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
      },
    ),
  },
};

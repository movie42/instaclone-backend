import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";

const resolvers = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio },
  { loggedInUser },
) => {
  let hashPassword = null;
  if (newPassword) {
    hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      ...(hashPassword && { password: hashPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "사용자 정보를 업데이트 할 수가 없습니다.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolvers),
  },
};

import * as jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }

    const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (resolverFunc) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "로그인이 필요합니다.",
      };
    }
    return resolverFunc(root, args, context, info);
  };

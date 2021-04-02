import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "30d",
  });

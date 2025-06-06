import { generateToken, verifyToken } from "@libs/jwt";
import { User } from "@prisma/client";
import { userService } from "@services/user.service";
import { Request } from "express";
import { TokenPayload } from "types/token-payload";

const authService = {
  verifyRequest: async (req: Request) => {
    const { authorization } = req.headers;

    if (authorization) {
      const authSplit = authorization.split("Bearer ");

      if (authSplit[1]) {
        const payload = verifyToken(authSplit[1]) as TokenPayload | null;

        if (payload) {
          const userId = payload.id;

          const user = await userService.getbyId(userId);

          if (user) {
            return user;
          }
        }
      }
    }
    return null;
  },

  createToken: (user: Pick<User, "id" | "name" | "email" | "role">) =>
    generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
};

export { authService };

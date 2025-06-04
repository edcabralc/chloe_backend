import { generateToken } from "@libs/jwt";
import { User } from "@prisma/client";
// import { TokenPaylod } from "types/token-payload";
// import { User } from "../../generated/prisma/client";
// import { userService } from "./user.service";

const authService = {
  // verifyRequest: async (req: Request) => {
  //   const { authorization } = req.headers;

  //   if (authorization) {
  //     const authSplit = authorization.split("Bearer ");

  //     if (authSplit[1]) {
  //       const payload = readJWT(authSplit[1]);

  //       if (payload) {
  //         const userId = (payload as TokenPaylod).id;
  //         const user = await userService.getUserById(userId);

  //         if (user) {
  //           return user;
  //         }
  //       }
  //     }
  //   }
  //   return false;
  // },

  createToken: (user: Pick<User, "id" | "name" | "email" | "role">) =>
    generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
};

export { authService };

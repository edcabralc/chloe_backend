import { prisma } from "@/libs/prisma";
import { Prisma, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const userService = {
  get: async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        imageProfile: true,
      },
    });

    return users;
  },

  getbyId: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        imageProfile: true,
      },
    });

    return user;
  },

  create: async ({
    name,
    email,
    password,
  }: Pick<User, "name" | "email" | "password">) => {
    email = email.toLocaleLowerCase();

    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      return false;
    }

    const hashedPassword = bcrypt.hashSync(password);

    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });
  },

  update: async (id: string, payload: Prisma.UserUpdateInput) => {
    const user = await prisma.user.update({
      where: { id },
      data: { ...payload },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });

    return user;
  },

  delete: async (id: string) => {
    await prisma.user.delete({ where: { id } });
    return true;
  },

  verifyUser: async ({ email, password }: Pick<User, "email" | "password">) => {
    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return false;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return false;
    }
  },
};

export { userService };

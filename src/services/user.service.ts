import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

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

  create: async (payload: Prisma.UserCreateInput) => {
    const newUser = await prisma.user.create({
      data: { ...payload },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
      },
    });

    return newUser;
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
};

export { userService };

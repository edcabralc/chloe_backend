import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

const roomService = {
  get: async () => {
    const users = await prisma.book.findMany({
      select: {
        id: true,
      },
    });

    return users;
  },

  getbyId: async (id: string) => {
    const user = await prisma.book.findUnique({
      where: { id },
      select: {},
    });

    return user;
  },

  create: async (payload: Prisma.RoomCreateInput) => {
    const newUser = await prisma.book.create({
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return newUser;
  },

  update: async (id: string, payload: Prisma.UserUpdateInput) => {
    const user = await prisma.book.update({
      where: { id },
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return user;
  },

  delete: async (id: string) => {
    await prisma.book.delete({ where: { id } });
    return true;
  },
};

export { roomService };

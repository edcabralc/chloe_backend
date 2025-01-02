import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

const roomService = {
  get: async () => {
    const users = await prisma.room.findMany({
      select: {
        id: true,
      },
    });

    return users;
  },

  getbyId: async (id: string) => {
    const user = await prisma.room.findUnique({
      where: { id },
      select: {},
    });

    return user;
  },

  create: async (payload: Prisma.RoomCreateInput) => {
    const newUser = await prisma.room.create({
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return newUser;
  },

  update: async (id: string, payload: Prisma.RoomUpdateInput) => {
    const user = await prisma.room.update({
      where: { id },
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return user;
  },

  delete: async (id: string) => {
    await prisma.room.delete({ where: { id } });
    return true;
  },
};

export { roomService };

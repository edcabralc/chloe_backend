import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

const roomService = {
  get: async () => {
    const rooms = await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        status: true,
      },
    });

    return rooms;
  },

  getbyId: async (id: string) => {
    const room = await prisma.room.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        status: true,
      },
    });

    return room;
  },

  create: async ({
    name,
    type,
    description,
    price,
    images,
    status,
  }: Prisma.RoomCreateInput) => {
    const newRoom = await prisma.room.create({
      data: { name, type, description, price, images, status },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        images: true,
        status: true,
        reservations: true,
      },
    });

    return newRoom;
  },

  update: async (
    id: string,
    { name, type, description, price, images, status }: Prisma.RoomUpdateInput
  ) => {
    const user = await prisma.room.update({
      where: { id },
      data: { name, type, description, price, images, status },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        images: true,
        status: true,
        reservations: true,
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

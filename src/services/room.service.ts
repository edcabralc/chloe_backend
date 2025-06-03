import { prisma } from "@libs/prisma";
import { Prisma } from "@prisma/client";

const roomService = {
  get: async () =>
    await prisma.room.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        status: true,
      },
    }),

  getbyId: async (id: string) =>
    await prisma.room.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        description: true,
        price: true,
        status: true,
      },
    }),

  create: async ({
    name,
    type,
    description,
    price,
    images,
    status,
  }: Prisma.RoomCreateInput) =>
    await prisma.room.create({
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
    }),

  update: async (
    id: string,
    { name, type, description, price, images, status }: Prisma.RoomUpdateInput
  ) =>
    await prisma.room.update({
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
    }),

  delete: async (id: string) => await prisma.room.delete({ where: { id } }),
};

export { roomService };

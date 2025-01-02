import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

const reservationService = {
  get: async () => {
    const users = await prisma.reservation.findMany({
      select: {
        id: true,
      },
    });

    return users;
  },

  getbyId: async (id: string) => {
    const user = await prisma.reservation.findUnique({
      where: { id },
      select: {},
    });

    return user;
  },

  create: async (payload: Prisma.ReservationCreateInput) => {
    const newUser = await prisma.reservation.create({
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return newUser;
  },

  update: async (id: string, payload: Prisma.ReservationUpdateInput) => {
    const user = await prisma.reservation.update({
      where: { id },
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return user;
  },

  delete: async (id: string) => {
    await prisma.reservation.delete({ where: { id } });
    return true;
  },
};

export { reservationService };

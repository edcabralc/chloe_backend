import { prisma } from "@/libs/prisma";
import { ReservationType } from "@/types/reservation.type";
import { Prisma } from "@prisma/client";

const reservationService = {
  get: async () => {
    const reservations = await prisma.reservation.findMany({
      select: {
        id: true,
      },
    });

    return reservations;
  },

  getbyId: async (id: string) => {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      select: {},
    });

    return reservation;
  },

  create: async ({
    peoples,
    checkIn,
    checkOut,
    totalDiscount,
    total,
    roomId,
    userId,
  }: ReservationType) => {
    const reservation = await prisma.reservation.create({
      data: {
        peoples,
        checkIn,
        checkOut,
        totalDiscount,
        total,
        room: { connect: { id: roomId } },
        user: { connect: { id: userId } },
      },

      select: {
        id: true,
      },
    });

    return reservation;
  },

  update: async (id: string, payload: Prisma.ReservationUpdateInput) => {
    const reservation = await prisma.reservation.update({
      where: { id },
      data: { ...payload },
      select: {
        id: true,
      },
    });

    return reservation;
  },

  delete: async (id: string) => {
    await prisma.reservation.delete({ where: { id } });
    return true;
  },
};

export { reservationService };

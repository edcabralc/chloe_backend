import { prisma } from "@/libs/prisma";
import { ReservationType } from "@/types/reservation.type";
import { Prisma } from "@prisma/client";

const reservationService = {
  get: async () => {
    const reservations = await prisma.reservation.findMany({
      select: {
        id: true,
        peoples: true,
        checkIn: true,
        checkOut: true,
        totalDiscount: true,
        total: true,
        status: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            images: true,
            type: true,
          },
        },
        services: {
          select: {
            id: true,
            price: true,
            description: true,
          },
        },
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

  getbyEmail: async (email: string) => {
    const reservation = await prisma.reservation.findMany({
      where: { user: { email: email } },
      include: {
        room: true,
        services: true,
      },
      orderBy: { checkIn: "desc" },
    });

    return reservation;
  },

  create: async ({
    peoples,
    checkIn,
    checkOut,
    roomId,
    userId,
    services,
  }: ReservationType) => {
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    const existingServices = await prisma.service.findMany({
      where: { id: { in: services || [] } },
    });

    const roomPrice = room?.price ? Number(room.price) : 0;
    const serviceTotal = existingServices.reduce(
      (acc, service) => acc + Number(service.price),
      0
    );

    const totalPrice = roomPrice + serviceTotal;

    const reservation = await prisma.reservation.create({
      data: {
        peoples,
        checkIn,
        checkOut,
        total: totalPrice,
        totalDiscount: 0,
        room: { connect: { id: roomId } },
        user: { connect: { id: userId } },
        services: {
          connect: services?.map(service => ({ id: service })),
        },
      },

      include: {
        services: true,
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

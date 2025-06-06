import { prisma } from "@libs/prisma";
import { Prisma } from "@prisma/client";
import { ReservationType } from "types/reservation.type";
import { generateTotal } from "utils/generateTotal.util";

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

  getByUser: async (userId: string) => {
    const reservation = await prisma.reservation.findMany({
      where: { userId },
      include: { room: true, services: true },
    });

    console.log("No service:", reservation);
    return reservation;
  },

  create: async ({ peoples, checkIn, checkOut, roomId, userId, services }: ReservationType) => {
    const room = await prisma.room.findUnique({ where: { id: roomId } });

    const existingServices = await prisma.service.findMany({
      where: { id: { in: services || [] } },
    });

    const roomPrice = room?.price ? Number(room.price) : 0;

    const totalPrice = generateTotal(roomPrice, existingServices);

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

  update: async (id: string, { peoples, checkIn, checkOut, total, services }: Prisma.ReservationUpdateInput) => {
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
      include: { room: true, services: true },
    });

    if (!existingReservation) {
      console.log("Reservation not found");
      return;
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        peoples,
        checkIn,
        checkOut,
        total: existingReservation.total,
        totalDiscount: 0,

        services: Array.isArray(services)
          ? { set: [], connect: services.map(service => ({ id: service })) }
          : undefined,
      },

      include: {
        services: true,
        room: true,
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

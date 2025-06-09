import { prisma } from "@libs/prisma";
import { reservationService } from "@services/reservation.service";
import { reservationValidator } from "@validators/reservation.validator";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";

const reservationController: { [key: string]: RequestHandler } = {
  get: async (_req, res) => {
    const reservations = await reservationService.get();

    res.status(200).json(reservations);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return;
    }

    const book = await reservationService.getbyId(id);

    res.status(200).json(book);
  },

  getGuestReservationId: async (req: ExtendedRequest, res) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ error: "Usuário não autenticado" });
      return;
    }

    try {
      const reservations = await reservationService.getByUser(userId);
      console.log("No controller", reservations);

      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar reservas do usuário" });
      return;
    }
  },

  create: async (req, res) => {
    const reservationParsed = reservationValidator.create(req.body);

    if (!reservationParsed.success) {
      res.status(400).json({
        error: reservationParsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { peoples, checkIn, checkOut, room, user, services } = reservationParsed.data;

    const book = await reservationService.create({
      peoples,
      checkIn,
      checkOut,
      roomId: room,
      userId: user,
      services,
    });

    res.status(201).json(book);
  },

  createByGuest: async (req: ExtendedRequest, res) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ error: "Usuário não autenticado" });
      return;
    }

    const reservationParsed = reservationValidator.createByUser(req.body);

    if (!reservationParsed.success) {
      res.status(400).json({
        error: reservationParsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { peoples, checkIn, checkOut, room, services } = reservationParsed.data;

    const book = await reservationService.create({
      peoples,
      checkIn,
      checkOut,
      roomId: room,
      userId,
      services,
    });

    res.status(201).json(book);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    const user = await reservationService.update(id, req.body);

    res.status(200).json(user);
  },

  updateByGuest: async (req: ExtendedRequest, res) => {
    const userId = req.user?.id;
    const reservationId = req.params.id;
    const validationResult = reservationValidator.updateByUser(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { peoples, checkIn, checkOut, services } = validationResult.data;

    try {
      const existingReservation = await prisma.reservation.findFirst({
        where: { userId, id: reservationId },
      });

      if (!existingReservation) {
        res.status(404).json({ error: "Reserva não encontrada." });
        return;
      }

      if (existingReservation?.userId !== userId && existingReservation?.id !== reservationId) {
        res.status(403).json({ error: "Você não tem permissão para atualizar esta reserva." });
        return;
      }

      const updatedReservation = await reservationService.update(existingReservation.id, {
        peoples,
        checkIn,
        checkOut,
        services: { connect: services?.map(service => ({ id: service })) },
      });

      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar reserva." });
      console.log(error);
      return;
    }
  },

  aproveReserve: async () => {},

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    await reservationService.delete(id);

    res.status(300).json({ message: "Registro removido com sucesso" });
  },
};

export { reservationController };

import { reservationService } from "@/services/reservation.service";
import { reservationValidator } from "@/validators/reservation.validator";
import { RequestHandler } from "express";

const reservationController: { [key: string]: RequestHandler } = {
  get: async (req, res) => {
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

  create: async (req, res) => {
    const reservationParsed = reservationValidator.create(req.body);

    if (!reservationParsed.success) {
      res.status(400).json({
        error: reservationParsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { peoples, checkIn, checkOut, total, totalDiscount, room, user } =
      reservationParsed.data;

    const book = await reservationService.create({
      peoples,
      checkIn,
      checkOut,
      totalDiscount,
      total,
      roomId: room.id,
      userId: user.id,
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

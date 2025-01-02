import { reservationService } from "@/services/reservation.service";
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
    const { peoples, checkIn, checkOut, total, roomId } = req.body;

    if (!checkIn || !checkOut) {
      return;
    }

    const book = await reservationService.create({
      peoples,
      checkIn,
      checkOut,
      total,
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

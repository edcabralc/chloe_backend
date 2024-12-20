import { roomService } from "@/services/room.service";
import { RequestHandler } from "express";

const roomController: { [key: string]: RequestHandler } = {
  get: async (req, res) => {
    const rooms = await roomService.get();

    res.status(200).json(rooms);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return;
    }

    const room = await roomService.getbyId(id);

    res.status(200).json(room);
  },

  create: async (req, res) => {
    const { name, type, description, price } = req.body;

    if (!name || !description || !price) {
      return;
    }

    const room = await roomService.create({ name, type, description, price });

    res.status(201).json(room);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    const room = await roomService.update(id, req.body);

    res.status(200).json(room);
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    await roomService.delete(id);

    res.status(300).json({ message: "Registro removido com sucesso" });
  },
};

export { roomController };

import { roomService } from "@/services/room.service";
import { roomValidator } from "@/validators/room.validator";
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
    const roomParsed = roomValidator.create(req.body);

    if (!roomParsed.success) {
      res.status(400).json({
        error: roomParsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, type, description, price } = roomParsed.data;

    if (!name || !description || !price) {
      return;
    }

    const room = await roomService.create({ name, type, description, price });

    res.status(201).json(room);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Parametro ID ausente na requisição" });
      return;
    }

    try {
      const upatedRoomFields = roomValidator.update(req.body);

      if (!upatedRoomFields.success) {
        res.status(400).json({
          error: upatedRoomFields.error.flatten().fieldErrors,
        });
        return;
      }

      const existingRoom = await roomService.getbyId(id);

      if (!existingRoom) {
        res.status(404).json({ error: "Quarto não localizado" });
        return;
      }

      const updateRoom = await roomService.update(
        existingRoom.id,
        upatedRoomFields.data
      );

      res.status(200).json(updateRoom);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar o quarto" });
    }
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

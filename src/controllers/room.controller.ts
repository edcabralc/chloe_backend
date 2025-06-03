import { roomService } from "@services/room.service";
import { roomValidator } from "@validators/room.validator";
import { RequestHandler } from "express";

const roomController: { [key: string]: RequestHandler } = {
  get: async (_req, res) => {
    const rooms = await roomService.get();

    res.status(200).json(rooms);
  },

  getById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    try {
      const existingRoom = await roomService.getbyId(id);

      if (!existingRoom) {
        res.status(404).json({ error: "Quarto não localizado" });
        return;
      }

      res.status(200).json(existingRoom);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar o quarto" });
    }
  },

  create: async (req, res) => {
    const validationResult = roomValidator.create(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, type, description, price } = validationResult.data;

    const newRoom = await roomService.create({
      name,
      type,
      description,
      price,
    });

    res.status(201).json(newRoom);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Parametro ID ausente na requisição" });
      return;
    }

    const validationResult = roomValidator.update(req.body);

    if (!validationResult.success) {
      res.status(400).json({
        error: validationResult.error.flatten().fieldErrors,
      });
      return;
    }

    const { name, type, description, price, status } = validationResult.data;

    try {
      const existingRoom = await roomService.getbyId(id);

      if (!existingRoom) {
        res.status(404).json({ error: "Quarto não localizado" });
        return;
      }

      const updateRoom = await roomService.update(existingRoom.id, {
        name,
        type,
        description,
        price,
        status,
      });

      res.status(200).json(updateRoom);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar o quarto" });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: "Parametro ID ausente na requisição" });
      return;
    }

    try {
      const existingRoom = await roomService.getbyId(id);

      if (!existingRoom) {
        res.status(404).json({ error: "Quarto não localizado" });
        return;
      }

      await roomService.delete(existingRoom.id);

      res.status(200).json({ message: "Quarto removido com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao remover quarto" });
    }
  },
};

export { roomController };

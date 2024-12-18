import { userService } from "@/services/user.service";
import { RequestHandler } from "express";

const userController: { [key: string]: RequestHandler } = {
  get: async (req, res) => {
    const users = await userService.get();

    res.status(200).json(users);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return;
    }

    const user = await userService.getbyId(id);

    res.status(200).json(user);
  },

  create: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return;
    }

    const user = await userService.create({ name, email, password });

    res.status(201).json(user);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    const user = await userService.update(id, req.body);

    res.status(200).json(user);
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    await userService.delete(id);

    res.status(300).json({ message: "Registro removido com sucesso" });
  },
};

export { userController };

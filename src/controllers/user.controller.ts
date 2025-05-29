import { userService } from "@/services/user.service";
import { userValidator } from "@/validators/user.validator";
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
    const userParsed = userValidator.create(req.body);

    if (!userParsed.success) {
      res.status(400).json({ error: userParsed.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = userParsed.data;

    const user = await userService.create({ name, email, password });

    if (!user) {
      res.status(400).json({ error: "Erro ao criar usuário" });
      return;
    }

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

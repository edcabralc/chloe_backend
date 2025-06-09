import { profileService } from "@services/profile.service";
import { RequestHandler } from "express";
import { ExtendedRequest } from "types/extended-request";

const profileController: { [key: string]: RequestHandler } = {
  getProfileById: async (req: ExtendedRequest, res) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ error: "Usuário não autenticado" });
      return;
    }

    const profile = await profileService.getAddressByUser(userId);

    res.status(200).json(profile);
  },

  create: async (req: ExtendedRequest, res) => {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ error: "Usuário não autenticado" });
      return;
    }

    const { cep, logradouro, numero, complemento, bairro, cidade, estado, pais } = req.body;

    const addresData = await profileService.createAddress(userId, {
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      pais,
      user: { connect: { id: userId } },
    });

    res.status(200).json(addresData);
  },

  update: async (req: ExtendedRequest, res) => {
    const user = req.user;

    if (!user) {
      res.status(400).json({ error: "Usuário não autenticado" });
      return;
    }

    const { name, email } = req.body;

    if (!name && !email) {
      res.status(400).json({ error: "Pelo menos um campo (nome ou email) deve ser fornecido" });
      return;
    }

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    // Simulate saving the user to the database
    // In a real application, you would call a service to update the user in the database
    res.status(200).json(user);
  },
};

export { profileController };

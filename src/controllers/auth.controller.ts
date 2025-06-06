import { RequestHandler } from "express";
import { Role } from "types/role.type";

import { userService } from "@services/user.service";

import { authService } from "@services/auth.service";
import { authValidador } from "@validators/auth.validator";

const authController: { [keys: string]: RequestHandler } = {
  register: async (req, res) => {
    const validationResult = authValidador.register(req.body);

    if (!validationResult.success) {
      res.status(400).json({ erro: validationResult.error.flatten().fieldErrors });
      return;
    }

    const { name, email, password } = validationResult.data;

    const existingUser = await userService.getByEmail(email);

    if (existingUser) {
      res.status(400).json({ error: "Email já cadastrado" });
      return;
    }

    const user = await userService.create({
      name,
      email,
      password,
      role: Role.GUEST,
    });

    if (!user) {
      res.status(400).json({ error: "Erro ao criar usuário" });
      return;
    }

    res.status(201).json(user);
  },

  login: async (req, res) => {
    const valideteResult = authValidador.login(req.body);

    if (!valideteResult.success) {
      res.status(400).json({ error: valideteResult.error.flatten().fieldErrors });
      return;
    }

    const { email, password } = valideteResult.data;

    const loggedUser = await userService.verifyUser({ email, password });

    if (!loggedUser) {
      res.status(401).json({ error: "Email ou senha inválidos" });
      return;
    }

    const token = authService.createToken(loggedUser);

    res.status(200).json({
      user: {
        id: loggedUser.id,
        name: loggedUser.name,
        email: loggedUser.email,
      },
      token,
    });
  },

  validate: (req, res) => {},
};

export { authController };

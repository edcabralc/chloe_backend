import { RequestHandler } from "express";

import { userValidator } from "@validators/user.validator";

const authController: { [keys: string]: RequestHandler } = {
  signup: async (req, res) => {
    const validationResult = userValidator.create(req.body);

    if (!validationResult.success) {
      res
        .status(400)
        .json({ erro: validationResult.error.flatten().fieldErrors });
      return;
    }

    // const existingUser = await userService.
  },

  signin: (req, res) => {},

  validate: (req, res) => {},
};

export { authController };

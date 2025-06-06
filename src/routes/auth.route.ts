import { authController } from "@controllers/auth.controller";
import { privateRoute } from "@middlewares/auth.middleware";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/validate", privateRoute, authController.validate);

export { authRoutes };

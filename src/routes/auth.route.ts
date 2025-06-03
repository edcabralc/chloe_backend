import { authController } from "@controllers/auth.controller";
import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/signup", authController.signup);
authRoutes.post("/signin", authController.signin);
authRoutes.post("/validate", authMiddleware, authController.validate);

export { authRoutes };

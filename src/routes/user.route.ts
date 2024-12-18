import { userController } from "@/controllers/user.controller";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", userController.get);
userRoutes.post("/", userController.create);
userRoutes.patch("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

export { userRoutes };

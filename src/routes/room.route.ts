import { roomController } from "@/controllers/room.controller";
import { Router } from "express";

const roomRoutes = Router();

roomRoutes.get("/", roomController.get);
roomRoutes.get("/:id", roomController.getById);
roomRoutes.post("/", roomController.create);
roomRoutes.patch("/:id", roomController.update);
roomRoutes.delete("/:id", roomController.delete);

export { roomRoutes };

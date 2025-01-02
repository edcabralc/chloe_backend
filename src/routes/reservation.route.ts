import { reservationController } from "@/controllers/reservation.controller";
import { Router } from "express";

const reservationRoutes = Router();

reservationRoutes.get("/", reservationController.get);
reservationRoutes.get("/:id", reservationController.getById);
reservationRoutes.post("/", reservationController.create);
reservationRoutes.patch("/:id");
reservationRoutes.delete("/:id");

export { reservationRoutes };

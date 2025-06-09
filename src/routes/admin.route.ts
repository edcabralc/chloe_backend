import { reservationController } from "@controllers/reservation.controller";
import { roomController } from "@controllers/room.controller";
import { serviceController } from "@controllers/service.controller";
import { userController } from "@controllers/user.controller";
import { Router } from "express";

const adminRoutes = Router();

adminRoutes.get("/users", userController.get);
adminRoutes.get("/users/:id", userController.getById);
adminRoutes.post("/users", userController.create);
adminRoutes.patch("/users/:id", userController.update);
adminRoutes.delete("/users/:id", userController.delete);

adminRoutes.get("/rooms", roomController.get);
adminRoutes.get("/rooms/:id", roomController.getById);
adminRoutes.post("/rooms", roomController.create);
adminRoutes.patch("/rooms/:id", roomController.update);
adminRoutes.delete("/rooms/:id", roomController.delete);

adminRoutes.get("/reservations", reservationController.get);
adminRoutes.get("/reservations/:id", reservationController.getById);
adminRoutes.post("/reservations", reservationController.create);
adminRoutes.patch("/reservations/:id", reservationController.update);
adminRoutes.delete("/reservations/:id", reservationController.delete);

adminRoutes.get("/services", serviceController.get);
adminRoutes.get("/services/:id", serviceController.getById);
adminRoutes.post("/services", serviceController.create);
adminRoutes.patch("/services/:id", serviceController.update);
adminRoutes.delete("/services/:id", serviceController.delete);

export { adminRoutes };

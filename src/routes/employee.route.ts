import { reservationController } from "@controllers/reservation.controller";
import { roomController } from "@controllers/room.controller";
import { serviceController } from "@controllers/service.controller";
import { userController } from "@controllers/user.controller";
import { Router } from "express";

const employeeRoutes = Router();

employeeRoutes.get("/users", userController.get);
employeeRoutes.get("/users/:id", userController.getById);
employeeRoutes.patch("/users/:id", userController.update);

employeeRoutes.get("/rooms", roomController.get);
employeeRoutes.get("/rooms/:id", roomController.getById);
employeeRoutes.post("/rooms", roomController.create);
employeeRoutes.patch("/rooms/:id", roomController.update);
employeeRoutes.delete("/rooms/:id", roomController.delete);

employeeRoutes.get("/reservation", reservationController.get);
employeeRoutes.get("/reservation/:id", reservationController.getById);
employeeRoutes.post("/reservation", reservationController.create);
employeeRoutes.patch("/reservation/:id", reservationController.update);
employeeRoutes.delete("/reservation/:id,", reservationController.delete);

employeeRoutes.get("/services", serviceController.get);
employeeRoutes.get("/services/:id", serviceController.getById);
employeeRoutes.post("/services", serviceController.create);
employeeRoutes.patch("/services/:id", serviceController.update);
employeeRoutes.delete("/services/:id", serviceController.delete);

export { employeeRoutes };

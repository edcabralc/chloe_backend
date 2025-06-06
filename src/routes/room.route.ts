import { roomController } from "@controllers/room.controller";
import { privilegeAccess } from "@middlewares/admin.middleware";
import { privateRoute } from "@middlewares/auth.middleware";
import { Router } from "express";
import { Role } from "types/role.type";

const roomRoutes = Router();

roomRoutes.get("/", roomController.get);
roomRoutes.get("/:id", roomController.getById);
roomRoutes.post("/", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), roomController.create);
roomRoutes.patch("/:id", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), roomController.update);
roomRoutes.delete("/:id", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), roomController.delete);

export { roomRoutes };

import { serviceController } from "@controllers/service.controller";
import { privilegeAccess } from "@middlewares/admin.middleware";
import { privateRoute } from "@middlewares/auth.middleware";
import { Router } from "express";
import { Role } from "types/role.type";

const serviceRoutes = Router();

serviceRoutes.get("/", privateRoute, serviceController.get);
serviceRoutes.get("/:id", privateRoute, serviceController.getById);
serviceRoutes.post("/", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), serviceController.create);
serviceRoutes.patch("/:id", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), serviceController.update);
serviceRoutes.delete("/:id", privateRoute, privilegeAccess(Role.ADMIN, Role.EMPLOYEE), serviceController.delete);

export { serviceRoutes };

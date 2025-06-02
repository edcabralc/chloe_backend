import { serviceController } from "@/controllers/service.controller";
import { Router } from "express";

const serviceRoutes = Router();

serviceRoutes.get("/", serviceController.get);
serviceRoutes.get("/:id", serviceController.getById);
serviceRoutes.post("/", serviceController.create);
serviceRoutes.patch("/:id", serviceController.update);
serviceRoutes.delete("/:id", serviceController.delete);

export { serviceRoutes };

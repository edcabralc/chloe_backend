import { Router } from "express";
import { userRoutes } from "./user.route";

const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);

export { mainRoutes };

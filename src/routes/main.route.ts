import { Router } from "express";
import { userRoutes } from "./user.route";

const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/books", userRoutes);

export { mainRoutes };

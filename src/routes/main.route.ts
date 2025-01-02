import { Router } from "express";

import { reservationRoutes } from "@/routes/reservation.route";
import { userRoutes } from "@/routes/user.route";

const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/reservations", reservationRoutes);

export { mainRoutes };

import { Router } from "express";

import { reservationRoutes } from "@/routes/reservation.route";
import { roomRoutes } from "@/routes/room.route";
import { userRoutes } from "@/routes/user.route";

const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/reservations", reservationRoutes);
mainRoutes.use("/rooms", roomRoutes);

export { mainRoutes };

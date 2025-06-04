import { Router } from "express";

import { authRoutes } from "@routes/auth.route";
import { reservationRoutes } from "@routes/reservation.route";
import { roomRoutes } from "@routes/room.route";
import { serviceRoutes } from "@routes/service.route";
import { userRoutes } from "@routes/user.route";

const mainRoutes = Router();

mainRoutes.use("/users", userRoutes);
mainRoutes.use("/reservations", reservationRoutes);
mainRoutes.use("/rooms", roomRoutes);
mainRoutes.use("/services", serviceRoutes);
mainRoutes.use("/auth", authRoutes);

export { mainRoutes };

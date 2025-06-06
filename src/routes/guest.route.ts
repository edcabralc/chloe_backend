import { reservationController } from "@controllers/reservation.controller";

import { Router } from "express";

const guestRoutes = Router();

guestRoutes.get("/reservations", reservationController.getGuestReservationId);
guestRoutes.post("/reservations", reservationController.create);
guestRoutes.delete("/reservations/:id", reservationController.delete);

export { guestRoutes };

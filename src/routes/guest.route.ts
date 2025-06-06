import { reservationController } from "@controllers/reservation.controller";

import { Router } from "express";

const guestRoutes = Router();

guestRoutes.get("/reservations", reservationController.getGuestReservationId);
guestRoutes.get("/reservations/:id", reservationController.getGuestReservationId);
guestRoutes.post("/reservations", reservationController.createByGuest);
guestRoutes.patch("/reservations/:id", reservationController.updateByGuest);
guestRoutes.delete("/reservations/:id", reservationController.delete);

export { guestRoutes };

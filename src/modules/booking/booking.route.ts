import { Router } from "express";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
import { bookingController } from "./booking.controller";

const router = Router();
// auth(Roles.admin),
router.post(
  "/",
  auth(Roles.admin, Roles.customer),
  bookingController.createBooking
);

router.get(
  "/",
  auth(Roles.customer, Roles.admin),
  bookingController.getBookings
);
router.put(
  "/:bookingId",
  auth(Roles.customer, Roles.admin),
  bookingController.updateBookings
);

export const bookingRoute = router;

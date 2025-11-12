import { Router } from "express";
import {
  createBooking,
  getBookingById,
  getBookingsForUser,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, createBooking);
router.get("/:id", protect, getBookingById);
router.get("/user/:userId", protect, getBookingsForUser);
router.put("/:id/cancel", protect, cancelBooking);

export default router;

import { Router } from "express";
import {
  createBooking,
  getBookingById,
  getBookingsForUser,
  cancelBooking,
  getHostBookings,
  deleteBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", protect, createBooking);
router.get("/:id", protect, getBookingById);
router.get("/user/:userId", protect, getBookingsForUser);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/host/me", protect, getHostBookings)
router.delete("/:id", protect, deleteBooking);
export default router;

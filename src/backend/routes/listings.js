import { Router } from "express";
import { protect, hostOnly } from "../middleware/auth.js";
import {
  getListings,
  createListing,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = Router();

router.get("/", getListings);
router.post("/", protect, hostOnly, createListing);
router.get("/:id", getListingById);
router.put("/:id", protect, hostOnly, updateListing);
router.delete("/:id", protect, hostOnly, deleteListing);

export default router;

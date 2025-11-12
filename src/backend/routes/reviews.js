import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { createReview, getReviewsForListing } from '../controllers/reviewController.js';


const router = Router();

router.post('/', protect, createReview);
router.get('/listing/:listingId', getReviewsForListing);


export default router;
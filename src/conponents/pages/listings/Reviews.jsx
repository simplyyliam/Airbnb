import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Avatar, Box, ProgressBar } from '../../shared';
import './Reviews.css';

export default function ListingReviews({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!listingId) return;

    async function fetchReviews() {
      try {
        const { data } = await api.get(`/reviews/listing/${listingId}`);
        setReviews(data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [listingId]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews yet.</div>;

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const breakdown = {
    Cleanliness: avgRating,
    Communication: avgRating,
    'Check-in': avgRating,
    Accuracy: avgRating,
    Location: avgRating,
    Value: avgRating
  };

  return (
    <Box>
      <div className='reviews-header ratings-container'>
        <div className='avg-rating'>
          <span className='star'>★</span>
          <span className='rating-text'>
            {avgRating.toFixed(1)} · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className='ratings'>
        <div className='reviews-left'>
          {['Cleanliness', 'Communication', 'Check-in'].map((key) => (
            <div key={key} className='row'>
              <h1>{key}</h1>
              <ProgressBar progress={breakdown[key]} />
            </div>
          ))}
        </div>
        <div className='reviews-right'>
          {['Accuracy', 'Location', 'Value'].map((key) => (
            <div key={key} className='row'>
              <h1>{key}</h1>
              <ProgressBar progress={breakdown[key]} />
            </div>
          ))}
        </div>
      </div>

      <div className='reviews-grid'>
        {reviews.map((r) => (
          <div key={r._id} className='review-item'>
            <Avatar src={r.user.avatar || '/avatar-1.png'} alt={`${r.user.name} avatar`} />
            <div>
              <div className='reviewer-name'>{r.user.name}</div>
              <div className='review-date'>{new Date(r.createdAt).toLocaleDateString()}</div>
              <div className='review-text'>{r.comment}</div>
            </div>
          </div>
        ))}
      </div>

      <button className='CTA'>Show all {reviews.length} reviews</button>
    </Box>
  );
}

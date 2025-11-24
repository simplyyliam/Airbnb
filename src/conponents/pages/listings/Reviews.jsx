import { Avatar, Box, ProgressBar } from '../../shared'
import { reviewsData } from '../../../lib'
import './Reviews.css'

export default function ListingReviews () {
  const avgRating = (
    reviewsData.reduce((s, r) => s + r.rating, 0) / reviewsData.length
  ).toFixed(1)

  return (
    <Box>
      <div
        className='reviews-header'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            <span style={{ color: '#ff385c', marginRight: 8 }}>★</span>
            {avgRating} · {reviewsData.length} reviews
          </div>
        </div>
      </div>

      <div className='ratings'>
        <div className='reviews-left'>
          <div className='row'>
            <h1>Cleanliness</h1>
            <ProgressBar progress={100} percentage={5.0} />
          </div>
          <div className='row'>
            <h1>Communication</h1>
            <ProgressBar progress={100} percentage={5.0} />
          </div>
          <div className='row'>
            <h1>Check-in</h1>
            <ProgressBar progress={100} percentage={5.0} />
          </div>
        </div>
        <div className='reviews-right'>
          <div className='row'>
            <h1>Accuracy</h1>
            <ProgressBar progress={100} percentage={5.0} />
          </div>
          <div className='row'>
            <h1>Location</h1>
            <ProgressBar progress={90} percentage={4.9} />
          </div>
          <div className='row'>
            <h1>Value</h1>
            <ProgressBar progress={80} percentage={4.8} />
          </div>
        </div>
      </div>
      <div
        className='reviews-grid'
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          marginTop: 18
        }}
      >
        {reviewsData.map((r, i) => (
          <div
            key={i}
            className='review-item'
            style={{ display: 'flex', gap: 12 }}
          >
            <Avatar src={r.avatar} alt={`${r.name} avatar`} />
            <div>
              <div style={{ fontWeight: 600 }}>{r.name}</div>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>
                {r.date}
              </div>
              <div style={{ color: '#222' }}>{r.text}</div>
            </div>
          </div>
        ))}
      </div>
      <button className='CTA'>Show all {reviewsData.length} reviews</button>
    </Box>
  )
}

import Box from '../../shared/Box'

const reviewsData = [
  {
    name: 'Jose',
    date: 'December 2021',
    avatar: '/images/avatars/jose.jpg',
    text: 'Host was very attentive.',
    rating: 5
  },
  {
    name: 'Shayna',
    date: 'December 2021',
    avatar: '/images/avatars/shayna.jpg',
    text: 'Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive. Cool murphy bed...',
    rating: 5
  },
  {
    name: 'Luke',
    date: 'December 2021',
    avatar: '/images/avatars/luke.jpg',
    text: 'Nice place to stay!',
    rating: 5
  },
  {
    name: 'Josh',
    date: 'November 2021',
    avatar: '/images/avatars/josh.jpg',
    text: 'Well designed and fun space, neighborhood has lots of energy and amenities.',
    rating: 5
  },
  {
    name: 'Vladko',
    date: 'November 2020',
    avatar: '/images/avatars/vladko.jpg',
    text: 'This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price.',
    rating: 5
  },
  {
    name: 'Jennifer',
    date: 'January 2022',
    avatar: '/images/avatars/jennifer.jpg',
    text: 'A centric place, near of a sub station and a supermarket with everything you need.',
    rating: 5
  }
]

export default function ListingsReviews () {
  const avgRating = (
    reviewsData.reduce((s, r) => s + r.rating, 0) / reviewsData.length
  ).toFixed(1)

  return (
    <Box className='reviews-section'>
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
          <div style={{ color: '#666', marginTop: 6 }}>
            Cleanliness · Communication · Check-in
          </div>
        </div>
        <button
          className='show-all-reviews'
          style={{ padding: '8px 12px', borderRadius: 8 }}
        >
          Show all {reviewsData.length} reviews
        </button>
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
            <img
              src={r.avatar}
              alt={`${r.name} avatar`}
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
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
    </Box>
  )
}

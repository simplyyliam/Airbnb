import { Box, ListingCard } from '../../shared'
import './AdminListing.css'
import { useListings } from '../../../hooks'
import { Link } from 'react-router-dom'

export default function AdminListing () {
  const { listings, loading } = useListings()
  if (loading) return <div className='loading'>Loading listings...</div>
  return (
    <Box className='admin-listing-container'>
      <h1>My hotel listins</h1>
      <hr />
      {listings.map(listing => (
        <div key={listing._id} className="admin-listing-card">
          <ListingCard  listing={listing} />
          <Link>
            <button id='update'>Update</button>
          </Link>
          <Link>
            <button id='delete'>Delete</button>
          </Link>
        </div>
      ))}
    </Box>
  )
}

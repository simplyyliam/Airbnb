import { Box, ListingCard } from '../../shared'
import './AdminListing.css'
import { useListings } from '../../../hooks'

export default function AdminListing () {
  const { listings, loading } = useListings()
  if (loading) return <div className='loading'>Loading listings...</div>
  return (
    <Box className='admin-listing-container'>
      <h1>My hotel listins</h1>
      <hr />
      {listings.map(listing => (
        <ListingCard key={listing._id} listing={listing} />
      ))}
    </Box>
  )
}

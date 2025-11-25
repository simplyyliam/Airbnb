import './Listing.css'
import { Navbar, Wrapper, Chip, ListingCard } from '../../shared'
import { useListings } from '../../../hooks'

export default function Listings () {
  const { listings, loading } = useListings()
  if (loading) return <div className='loading'>Loading listings...</div>

  return (
    <div className='listing-container'>
      <Navbar />
      <Wrapper className='listing-wrapper'>
        <h1>200+ Airbnb Luxe stays in New York</h1>

        <div className='listing-chips'>
          <Chip>Free cancellations</Chip>
          <Chip>Type of place</Chip>
          <Chip>Price</Chip>
          <Chip>Instant Book</Chip>
          <Chip>More filters</Chip>
        </div>

        <hr />

        {listings.map(listing => (
          <ListingCard key={listing._id} listing={listing} />
        ))}

        <hr />
      </Wrapper>
    </div>
  )
}

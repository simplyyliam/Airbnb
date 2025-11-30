import './Listing.css'
import { Navbar, Wrapper, Chip, ListingCard } from '../../shared'
import { useListings } from '../../../hooks'
import { useLocation } from 'react-router-dom'

export default function Listings () {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const city = params.get("city"); // ?city=Rome

  const { listings, loading } = useListings({ city });

  if (loading) return <div className='loading'>Loading listings...</div>;

  const titleCity = city ? city : "the world";

  return (
    <Wrapper className='listing-container'>
      <Navbar />

      <div className='listing-wrapper'>
        <h1>200+ Airbnb Luxe stays in {titleCity}</h1>

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
      </div>
    </Wrapper>
  )
}

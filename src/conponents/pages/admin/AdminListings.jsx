import { Box, ListingCard } from '../../shared'
import './AdminListing.css'
import { useListings } from '../../../hooks'
import { useNavigate } from 'react-router-dom'
import api from "../../../api/axios";

export default function AdminListing() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const hostId = user?._id

  const { listings, loading, setListings } = useListings({hostId})

  if (loading) return <div className='loading'>Loading listings...</div>

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) return

    try {
      await api.delete(`/listings/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })

      setListings(prev => prev.filter(listing => listing._id !== id))
      alert('Listing deleted successfully!')
    } catch (err) {
      console.error(err.response?.data || err)
      alert('Failed to delete listing')
    }
  }

  const handleUpdate = (listing) => {
    navigate('/admin-create', { state: { listing } })
  }

  return (
    <Box className='admin-listing-container'>
      <h1>My hotel listings</h1>
      <hr />
      {listings.map(listing => (
        <div key={listing._id} className="admin-listing-card">
          <ListingCard listing={listing} />
          <button id='update' onClick={() => handleUpdate(listing)}>Update</button>
          <button id='delete' onClick={() => handleDelete(listing._id)}>Delete</button>
        </div>
      ))}
    </Box>
  )
}

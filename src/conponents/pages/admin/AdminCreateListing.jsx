import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CreateListing.css'
import { Wrapper } from '../../shared'
import axios from 'axios'
import { useAuth } from '../../../hooks'

export default function CreateListing() {
  const { currentUser, isHost, loading, token } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const editingListing = location.state?.listing || null

  const [form, setForm] = useState({
    title: '',
    bedrooms: 1,
    bathrooms: 1,
    address: '',
    city: '',
    country: '',
    price: 0,
    guests: 1,
    description: '',
    images: ''
  })

  const [amenity, setAmenity] = useState('')
  const [amenities, setAmenities] = useState([])

  // Prefill form if editing
  useEffect(() => {
    if (editingListing) {
      setForm({
        ...editingListing,
        images: Array.isArray(editingListing.images)
          ? editingListing.images.join('\n')
          : editingListing.images
      })
      setAmenities(editingListing.amenities || [])
    }
  }, [editingListing])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addAmenity = () => {
    if (amenity.trim() !== '') {
      setAmenities(prev => [...prev, amenity])
      setAmenity('')
    }
  }

  const handleSubmit = async () => {
    if (loading) return
    if (!currentUser || !isHost) {
      alert('❌ You must be logged in as a host to create a listing')
      return
    }

    try {
      const payload = {
        ...form,
        amenities,
        images: typeof form.images === 'string' ? form.images.split('\n') : form.images
      }

      if (editingListing) {
        // Update existing listing
        await axios.put(
          `http://localhost:5000/api/listings/${editingListing._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('✅ Listing updated successfully!')
      } else {
        // Create new listing
        await axios.post(
          'http://localhost:5000/api/listings',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('✅ Listing created successfully!')
      }

      navigate('/admin-listings')
    } catch (err) {
      console.error(err.response?.data || err)
      alert('❌ Failed to save listing')
    }
  }

  return (
    <Wrapper className='create-container'>
      <h1 className='title'>{editingListing ? 'Edit Listing' : 'Create Listing'}</h1>

      <div className='form-grid'>
        <div className='form-group'>
          <label>Listing Name</label>
          <input
            name='title'
            value={form.title}
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='row-group'>
          <div className='small-group'>
            <label>Rooms</label>
            <input
              name='bedrooms'
              value={form.bedrooms}
              onChange={handleChange}
              type='number'
            />
          </div>

          <div className='small-group'>
            <label>Baths</label>
            <input
              name='bathrooms'
              value={form.bathrooms}
              onChange={handleChange}
              type='number'
            />
          </div>

          <div className='small-group'>
            <label>Guests</label>
            <input
              name='guests'
              value={form.guests}
              onChange={handleChange}
              type='number'
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Address</label>
          <input
            name='address'
            value={form.address}
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='form-group'>
          <label>City</label>
          <input
            name='city'
            value={form.city}
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='form-group'>
          <label>Country</label>
          <input
            name='country'
            value={form.country}
            onChange={handleChange}
            type='text'
          />
        </div>

        <div className='form-group'>
          <label>Price (per night)</label>
          <input
            name='price'
            value={form.price}
            onChange={handleChange}
            type='number'
          />
        </div>

        <div className='description-group'>
          <label>Description</label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className='amenities-group'>
          <label>Amenities</label>
          <div className='amenities-row'>
            <input
              type='text'
              value={amenity}
              onChange={e => setAmenity(e.target.value)}
            />
            <button type='button' className='add-btn' onClick={addAmenity}>
              Add
            </button>
          </div>

          <ul className='amenity-list'>
            {amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className='images-group'>
          <label>Images (paste URLs, one per line)</label>
          <textarea
            className='images-box'
            name='images'
            value={form.images}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className='actions'>
        <button
          className='create-btn'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Loading...' : editingListing ? 'Update' : 'Create'}
        </button>

        <button
          className='cancel-btn'
          onClick={() => navigate('/admin-listings')}
        >
          Cancel
        </button>
      </div>
    </Wrapper>
  )
}

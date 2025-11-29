import { useState } from 'react'
import './CreateListing.css'
import { Wrapper } from '../../shared'
import axios from 'axios'
import { useAuth } from '../../../hooks'

export default function CreateListing () {
  const { currentUser, isHost, loading, token } = useAuth()

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
    images: []
  })

  const [amenity, setAmenity] = useState('')
  const [amenities, setAmenities] = useState([])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const addAmenity = () => {
    if (amenity.trim() !== '') {
      setAmenities(prev => [...prev, amenity])
      setAmenity('')
    }
  }

  const createListing = async () => {
    if (loading) return
    if (!currentUser || !isHost) {
      alert('❌ You must be logged in as a host to create a listing')
      return
    }

    try {
      const payload = {
        ...form,
        amenities,
        images:
          typeof form.images === 'string'
            ? form.images.split('\n')
            : form.images
      }

      const res = await axios.post(
        'http://localhost:5000/api/listings',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      alert('✅ Listing created successfully!')
      console.log(res.data)
    } catch (err) {
      console.error(err.response?.data || err)
      alert('❌ Failed to create listing')
    }
  }

  return (
    <Wrapper className='create-container'>
      <h1 className='title'>Create Listing</h1>

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
            <button className='add-btn' onClick={addAmenity}>
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
          onClick={createListing}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Create'}
        </button>

        <button className='cancel-btn'>Cancel</button>
      </div>
    </Wrapper>
  )
}

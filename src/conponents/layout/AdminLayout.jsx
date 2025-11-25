import { Link, Outlet } from 'react-router-dom'
import { Chip, Navbar, Wrapper } from '../shared'
import './AdminLayout.css'

export default function AdminLayout () {
  return (
    <div>
      <div className='admin-header'>
        <Navbar />
        <div className='filters'>
          <Link to="/admin-reservations">
            <Chip>View Reservations</Chip>
          </Link>
          <Link to="/admin-listings">
            <Chip>View Listings</Chip>
          </Link>
          <Link to="/create-listings">
            <Chip>Create Listing</Chip>
          </Link>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

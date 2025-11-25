import { Link, Outlet } from 'react-router-dom'
import { Chip, Navbar, Wrapper } from '../shared'
import './AdminLayout.css'

export default function AdminLayout () {
  return (
    <div>
      <div className='admin-header'>
        <Navbar />
        <div className='filters'>
          <Link>
            <Chip>View Reservations</Chip>
          </Link>
          <Link>
            <Chip>View Listings</Chip>
          </Link>
          <Link>
            <Chip>Create Listing</Chip>
          </Link>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

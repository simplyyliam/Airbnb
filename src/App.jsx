import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './conponents/layout/UserLayout'
import { AdminListing, ReservationList, Home, ListingDetails, Listings } from './conponents/pages'
import AdminLayout from './conponents/layout/AdminLayout'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listings/:id' element={<ListingDetails />} />
        </Route>

        <Route element={<AdminLayout/>}>
          <Route path='/admin-listings' element={<AdminListing/>}/>
          <Route path='/admin-reservations' element={<ReservationList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

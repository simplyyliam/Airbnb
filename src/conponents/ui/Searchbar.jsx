import './Searchbar.css'

import { ChevronDown, Search } from 'lucide-react'

export default function Searchbar () {
  return (
    <div id='container'>
      <div className='search-container'>
        <div className='locations'>
          <div className='header'>
            <h1>Locations</h1>
            <p>Select Location</p>
          </div>
          {/* <span className='btn'>
            <ChevronDown color='blue' />
          </span> */}
        </div>
        <span className='separator' />
        <div className='check-in'>
          <div className='header'>
            <h1>Check in</h1>
            <p>Add dates</p>
          </div>
          {/* <span className='btn'>
            <ChevronDown color='blue' />
          </span> */}
        </div>
        <span className='separator' />
        <div className='checkout'>
          <div className='header'>
            <h1>Check out</h1>
            <p>Add dates</p>
          </div>
          {/* <span className='btn'>
            <ChevronDown color='blue' />
          </span> */}
        </div>
        <span className='separator' />
        <div className='guests'>
          <div className='header'>
            <h1>Guests</h1>
            <p>Add guests</p>
          </div>
          {/* <span className='btn'>
            <ChevronDown color='blue' />
          </span> */}
        </div>
        <div className='search'>
          <Search />
        </div>
      </div>
    </div>
  )
}

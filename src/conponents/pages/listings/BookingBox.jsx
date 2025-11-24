export default function BookingBox () {
  return (
    <div className='content-right'>
      <div className='booking-box'>
        <div className='booking-header'>
          <h1>
            $79 / <span>night</span>
          </h1>
          <span>$555</span>
        </div>
        <div className='booking-details'>
          <div className='reservation'>
            <div className='check-in'>
              <h1>CHECK-IN</h1>
              <input type='date' />
            </div>
            <div className='check-out'>
              <h1>CHECK-OUT</h1>
              <input type='date' />
            </div>
          </div>
          <div className='guest'>
            <div className='guest-amount'>
              <h1>GUESTS</h1>
              <p>2 guests</p>
            </div>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20.3334 14.3333L16.0001 18.9999L11.6667 14.3333'
                stroke='#141414'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
        </div>
        <button>Reserve</button>
        <p>You won’t be charged yet</p>
        <div className='booking-price-details'>
          <div className='row'>
            <h1>$79 x 7 nights</h1>
            <span>$555</span>
          </div>
          <div className='row'>
            <h1>Weekly discount</h1>
            <span>-$28</span>
          </div>
          <div className='row'>
            <h1>Cleaning fee</h1>
            <span>$62</span>
          </div>
          <div className='row'>
            <h1>Service fee</h1>
            <span>$83</span>
          </div>
          <div className='row'>
            <h1>Occupancy taxes and fees</h1>
            <span>$29</span>
          </div>
          <hr />
        </div>
        <div className='total'>
          <div className='row'>
            <h1>Total</h1>
            <span>$701</span>
          </div>
        </div>
      </div>
      <div className='report'>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.16675 3.83337V12.8334'
            stroke='#6B7280'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
          <path
            d='M3.16675 10.1666V3.83329C3.16675 3.83329 4.00008 3.16663 6.00008 3.16663C8.00008 3.16663 9.00008 4.16663 10.6667 4.16663C12.3334 4.16663 12.8334 3.83329 12.8334 3.83329L10.5001 6.99996L12.8334 10.1666C12.8334 10.1666 12.3334 10.8333 10.6667 10.8333C9.00008 10.8333 7.66675 9.49996 6.00008 9.49996C4.33341 9.49996 3.16675 10.1666 3.16675 10.1666Z'
            stroke='#6B7280'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <p>Report this listing</p>
      </div>
    </div>
  )
}

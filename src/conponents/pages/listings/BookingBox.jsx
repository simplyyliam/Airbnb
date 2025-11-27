import { useState, useMemo } from 'react'

// Utility function to simulate fetching user data 
const useAuth = () => {
  const [currentUser] = useState(null)
  return {
    currentUser,
    isLoggedIn: !!currentUser,
    isHost: currentUser?.isHost || false,
    userToken: currentUser?.token || '',
    promptLogin: () => alert('Please log in to make a reservation.')
  }
}

// Utility function to calculate the difference in days between two dates
const calculateNights = (start, end) => {
  if (!start || !end) return 0

  const startDate = new Date(start)
  const endDate = new Date(end)

  // Reset time part to ensure calculation is based only on days
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)

  const oneDay = 1000 * 60 * 60 * 24 // milliseconds in a day
  const differenceMs = endDate.getTime() - startDate.getTime()

  // Ensure end date is after start date
  if (differenceMs <= 0) return 0

  return Math.round(differenceMs / oneDay)
}

export default function BookingBox ({
  listingId,
  price,
  ratingsAverage,
  ratingsQuantity,
  maxGuests
}) {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const { currentUser, isLoggedIn, isHost, userToken, promptLogin } = useAuth()
  
  // --- Price Sanitization (Now relies on the 'price' prop from parent) ---
  const numericPrice = Number(price) || 0;
  
  // --- Rating Sanitization ---
  const displayRating = ratingsAverage ? ratingsAverage.toFixed(1) : '4.8'; 
  const displayReviews = ratingsQuantity ? ratingsQuantity : '120'; 


  // --- Nights Calculation ---
  const nights = useMemo(() => {
    return calculateNights(checkInDate, checkOutDate)
  }, [checkInDate, checkOutDate])

  // --- Guest Price Adjustment Logic (Base 2 guests included) ---
  const BASE_GUESTS_INCLUDED = 2; 
  const EXTRA_GUEST_FEE_PER_NIGHT = 15;

  const extraGuests = Math.max(0, guests - BASE_GUESTS_INCLUDED);
  // GUEST_FEE is now correctly calculated based on extra guests * fee * nights
  const GUEST_FEE = extraGuests * EXTRA_GUEST_FEE_PER_NIGHT * nights;

  // Fees and calculation 
  const BASE_PRICE = numericPrice * nights
  const CLEANING_FEE = 62
  const SERVICE_FEE = 83
  const OCCUPANCY_TAX = 29
  const WEEKLY_DISCOUNT = nights >= 7 ? 28 : 0

  // Total calculation now includes the BASE_PRICE (which relies on nights) and GUEST_FEE
  const total =
    BASE_PRICE + 
    GUEST_FEE + 
    CLEANING_FEE + 
    SERVICE_FEE + 
    OCCUPANCY_TAX -
    WEEKLY_DISCOUNT

  // --- Reservation Logic (Unchanged) ---
  const handleReserve = async () => {
    if (!isLoggedIn) {
      promptLogin()
      return
    }

    if (isHost) {
      alert(
        'Host users cannot make reservations on their own platform listings.'
      )
      return
    }

    if (nights <= 0) {
      alert('Please select valid check-in and check-out dates.')
      return
    }

    if (guests > maxGuests) {
      alert(`This listing only accommodates a maximum of ${maxGuests} guests.`)
      return
    }

    const bookingData = {
      listing: listingId,
      user: currentUser._id,
      startDate: checkInDate,
      endDate: checkOutDate,
      guests: guests,
      totalPrice: total
    }

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify(bookingData)
      })

      if (res.ok) {
        const data = await res.json()
        alert(
          `✅ Reservation successful! Total: $${total.toFixed(
            2
          )}. Booking ID: ${data._id}`
        )
      } else {
        const errorData = await res.json()
        alert(
          `❌ Reservation failed: ${
            errorData.message || 'Something went wrong.'
          }`
        )
      }
    } catch (error) {
      alert('❌ An unexpected error occurred during reservation.')
      console.error(error)
    }
  }

  return (
    <div className='content-right'>
      <div className='booking-box'>
        <div className='booking-header'>
          <h1>
            ${numericPrice.toFixed(2)} / <span>night</span>
          </h1>
          <div className='booking-ratings'>
            <h1>{displayRating}</h1>•
            <h1>{displayReviews} reviews</h1>
          </div>
        </div>

        <div className='booking-details'>
          <div className='reservation'>
            <div className='check-in'>
              <h1>CHECK-IN</h1>
              <input
                type='date'
                value={checkInDate}
                onChange={e => setCheckInDate(e.target.value)}
              />
            </div>
            <div className='check-out'>
              <h1>CHECK-OUT</h1>
              <input
                type='date'
                value={checkOutDate}
                onChange={e => setCheckOutDate(e.target.value)}
                min={
                  checkInDate
                    ? new Date(
                        new Date(checkInDate).getTime() + 1000 * 60 * 60 * 24
                      )
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                disabled={!checkInDate}
              />
            </div>
          </div>
          <div className='guest'>
            <div className='guest-amount'>
              <h1>GUESTS</h1>
              <select
                className='guest-select'
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
              >
                {Array.from(
                  { length: Number(maxGuests) || 4 },
                  (_, i) => i + 1
                ).map(num => (
                  <option key={num} value={num}>
                    {num} guest{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
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
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </div>

        <button
          onClick={handleReserve}
          disabled={nights <= 0 || guests > maxGuests || isHost}
        >
          {isHost
            ? 'Host Cannot Reserve'
            : nights > 0
            ? 'Reserve'
            : 'Check Availability'}
        </button>

        <p>You won’t be charged yet</p>

        {/* Dynamic Price Breakdown - Only visible when dates are selected */}
        {nights > 0 && (
          <div className='booking-price-details'>
            <div className='row'>
              <h1>
                ${numericPrice.toFixed(2)} x {nights} night{nights > 1 ? 's' : ''}
              </h1>
              <span>${BASE_PRICE.toFixed(2)}</span>
            </div>

            {/* Display Extra Guest Fee if applicable */}
            {GUEST_FEE > 0 && (
              <div className='row'>
                <h1>Extra guest fee ({extraGuests}x ${EXTRA_GUEST_FEE_PER_NIGHT})</h1>
                <span>${GUEST_FEE.toFixed(2)}</span>
              </div>
            )}

            {WEEKLY_DISCOUNT > 0 && (
              <div className='row'>
                <h1>Weekly discount</h1>
                <span>-${WEEKLY_DISCOUNT.toFixed(2)}</span>
              </div>
            )}

            <div className='row'>
              <h1>Cleaning fee</h1>
              <span>${CLEANING_FEE.toFixed(2)}</span>
            </div>
            <div className='row'>
              <h1>Service fee</h1>
              <span>${SERVICE_FEE.toFixed(2)}</span>
            </div>
            <div className='row'>
              <h1>Occupancy taxes and fees</h1>
              <span>${OCCUPANCY_TAX.toFixed(2)}</span>
            </div>
            <hr />
            <div className='total'>
              <div className='row'>
                <h1>Total</h1>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
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
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M3.16675 10.1666V3.83329C3.16675 3.83329 4.00008 3.16663 6.00008 3.16663C8.00008 3.16663 9.00008 4.16663 10.6667 4.16663C12.3334 4.16663 12.8334 3.83329 12.8334 3.83329L10.5001 6.99996L12.8334 10.1666C12.8334 10.1666 12.3334 10.8333 10.6667 10.8333C9.00008 10.8333 7.66675 9.49996 6.00008 9.49996C4.33341 9.49996 3.16675 10.1666 3.16675 10.1666Z'
            stroke='#6B7280'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p>Report this listing</p>
      </div>
    </div>
  )
}
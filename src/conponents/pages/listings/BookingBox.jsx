import { useState, useMemo } from 'react'
import api from "../../../api/axios";
import { useAuth } from '../../../hooks'

const calculateNights = (start, end) => {
  if (!start || !end) return 0
  const startDate = new Date(start)
  const endDate = new Date(end)
  startDate.setHours(0, 0, 0, 0)
  endDate.setHours(0, 0, 0, 0)
  const differenceMs = endDate.getTime() - startDate.getTime()
  if (differenceMs <= 0) return 0
  return Math.round(differenceMs / (1000 * 60 * 60 * 24))
}

export default function BookingBox ({
  listingId,
  // hostId,
  price,
  ratingsAverage,
  ratingsQuantity,
  maxGuests
}) {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const { currentUser, isLoggedIn, isHost, userToken, promptLogin } = useAuth()

  const numericPrice = Number(price) || 0
  const displayRating = ratingsAverage ? ratingsAverage.toFixed(1) : '4.8'
  const displayReviews = ratingsQuantity || 120
  const nights = useMemo(
    () => calculateNights(checkInDate, checkOutDate),
    [checkInDate, checkOutDate]
  )

  const BASE_GUESTS_INCLUDED = 2
  const EXTRA_GUEST_FEE_PER_NIGHT = 15
  const extraGuests = Math.max(0, guests - BASE_GUESTS_INCLUDED)
  const GUEST_FEE = extraGuests * EXTRA_GUEST_FEE_PER_NIGHT * nights
  const BASE_PRICE = numericPrice * nights
  const CLEANING_FEE = 62
  const SERVICE_FEE = 83
  const OCCUPANCY_TAX = 29
  const WEEKLY_DISCOUNT = nights >= 7 ? 28 : 0
  const total =
    BASE_PRICE +
    GUEST_FEE +
    CLEANING_FEE +
    SERVICE_FEE +
    OCCUPANCY_TAX -
    WEEKLY_DISCOUNT

  const handleReserve = async () => {
    console.log("🔍 DEBUG - Token check:", {
      userToken: userToken ? "exists" : "MISSING",
      tokenLength: userToken?.length,
      isLoggedIn,
      currentUser: currentUser?._id
    });

    try {
      const bookingData = {
        listingId,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice: total
      };

      console.log("📤 Sending booking:", bookingData);
      console.log("📋 Auth header will be:", `Bearer ${userToken}`);

      const res = await api.post('/bookings', bookingData, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      
      console.log("✅ Success:", res.data);
    } catch (err) {
      console.error("❌ Full error object:", {
        status: err.response?.status,
        statusText: err.response?.statusText,
        message: err.response?.data?.message,
        headers: err.config?.headers,
        token: err.config?.headers?.Authorization
      });
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
            <h1>{displayRating}</h1>•<h1>{displayReviews} reviews</h1>
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

        {nights > 0 && (
          <div className='booking-price-details'>
            <div className='row'>
              <h1>
                ${numericPrice.toFixed(2)} x {nights} night
                {nights > 1 ? 's' : ''}
              </h1>
              <span>${BASE_PRICE.toFixed(2)}</span>
            </div>
            {GUEST_FEE > 0 && (
              <div className='row'>
                <h1>
                  Extra guest fee ({extraGuests}x ${EXTRA_GUEST_FEE_PER_NIGHT})
                </h1>
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
    </div>
  )
}

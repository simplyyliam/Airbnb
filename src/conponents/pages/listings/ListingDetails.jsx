import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ListingDetails.css'
import { Avatar, Wrapper } from '../../shared'
import { ListingData } from '../../../lib'
import {
  Amenities,
  BookingBox,
  Dates,
  Host,
  ListingReviews
} from '../../../conponents/pages'

export default function ListingDetails () {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [nights, setNights] = useState(1)

  useEffect(() => {
    async function loadListing () {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`)
      const data = await res.json()
      setListing(data)
    }
    loadListing()
  }, [id])

  if (!listing) return <div className='loading'>Loading...</div>

  const cleaningFee = 50
  const serviceFee = 30
  const total = listing.price * nights + cleaningFee + serviceFee

  return (
    <Wrapper className='listing-details-wrapper'>
      <div className='header'>
        <h1>Bordeaux Getaway</h1>
        <div className='header-details'>
          <div className='left'>
            <p>5.0</p>
            <p>7 reviews</p>
            <p>Superhost</p>
            <p>Bordeaux, France</p>
          </div>
          <div className='right'>
            <p>Share</p>
            <p>Save</p>
          </div>
        </div>
      </div>
      <div className='image-grid'>
        <div className='main'>
          <img src='/hero.jpg' alt='' />
        </div>
        <div className='rows'>
          <img className='img-item' src='/hero.jpg' alt='' />
          <img className='img-item' src='/hero.jpg' alt='' />
          <img className='img-item' src='/hero.jpg' alt='' />
          <img className='img-item' src='/hero.jpg' alt='' />
        </div>
      </div>
      <div className='content'>
        <div className='content-left'>
          <div className='content-header'>
            <div className='title'>
              <h1>Entire rental unit hosted by Ghazal</h1>
              <div className='info'>
                <p>2 guests</p>
                <p>1 bedroom</p>
                <p>1 bed</p>
                <p>1 bath</p>
              </div>
            </div>
            <Avatar src={'/avatar-1.png'} />
          </div>
          <hr />
          <div className='content-details'>
            {ListingData.Details.map((l, i) => (
              <div key={i} className='details-item'>
                <svg
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M9.00029 25.6671H23.0003C24.473 25.6671 25.667 24.4732 25.667 23.0004V13.0004L16.0003 6.33374L6.33362 13.0004V23.0004C6.33362 24.4732 7.52753 25.6671 9.00029 25.6671Z'
                    stroke='black'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M12.9995 20.9989C12.9995 19.5262 14.1934 18.3323 15.6662 18.3323H16.3328C17.8056 18.3323 18.9995 19.5262 18.9995 20.9989V25.6656H12.9995V20.9989Z'
                    stroke='black'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>

                <div className='details-title'>
                  <h1>{l.title}</h1>
                  <p>{l.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className='content-description'>
            <h1>
              Come and stay in this superb duplex T2, in the heart of the
              historic center of Bordeaux. Spacious and bright, in a real
              Bordeaux building in exposed stone, you will enjoy all the charms
              of the city thanks to its ideal location. Close to many shops,
              bars and restaurants, you can access the apartment by tram A and C
              and bus routes 27 and 44. ...
            </h1>
            <div className='show-more'>
              <h1>Show more</h1>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.16663 5.83337L9.49996 8.00004L7.16663 10.1667'
                  stroke='black'
                  stroke-width='1.5'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
          </div>
          <hr />
          <div className='content-rooms'>
            <h1>Where you'll sleep</h1>
            <div className='thumbnail'>
              <img src='/hero.jpg' alt='' />
              <div className='thumbnail-title'>
                <h1>Bedroom</h1>
                <p>1 queen bed</p>
              </div>
            </div>
          </div>
          <hr />
          <Amenities />
          <hr />
          <Dates />
        </div>

        <BookingBox />
      </div>

      <hr />
      <ListingReviews />
      <hr />
      <Host />
      <hr />
    </Wrapper>
  )
}

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './ListingDetails.css'

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
    <div className="">hello</div>
  )
}

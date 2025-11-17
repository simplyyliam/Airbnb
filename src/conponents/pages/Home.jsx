import { Link } from 'react-router-dom'
import './Home.css'

export default function Home () {
  return (
    <div className='home-container'>
      <div className='hero-inner'>
        <div className='hero'>
          <div className='header'>
            <h1>Not sure where to go? Perfect.</h1>
            <Link>
              <button>I'm flexible</button>
            </Link>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='next-trips'>
          <h1 className='section-title'>Inspiration for your next trip</h1>
          <div className='carousel'>
            <div className='card'>
              <div className='card-hero'></div>
              <div className='card-info'>
                <h1>Sandton City Hotel</h1>
                <p>53 km away</p>
              </div>
            </div>
          </div>
        </div>
        <div className='discover'>
          <h1 className='section-title'>Discover Airbnb Experiences</h1>
          <div className='carousel'>
            <div className='card-hero'>
              <div className='card-info'></div>
            </div>
            <div className='card-hero'>
              <div className='card-info'></div>
            </div>
          </div>
        </div>
        <div className='shop-airbnb'></div>
        <div className='questions'></div>
      </div>
    </div>
  )
}

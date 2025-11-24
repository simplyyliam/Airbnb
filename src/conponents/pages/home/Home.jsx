import { Link } from 'react-router-dom'
import './Home.css'
import { LandingData } from '../../../lib'
import { Navbar, Searchbar } from '../../shared'

export default function Home () {
  return (
    <div className='home-container'>
      <Navbar />
      <Searchbar />
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
            {LandingData.trips.map(t => (
              <div className='card'>
                <img className='card-hero' src={t.img} alt='' />
                <div className='card-info'>
                  <h1>{t.title}</h1>
                  <p>{t.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='discover'>
          <h1 className='section-title'>Discover Airbnb Experiences</h1>
          <div className='carousel'>
            <div className='card-hero'>
              <div className='card-info'>
                <h1>Things to do on your trip</h1>
                <button>Experiences</button>
              </div>
            </div>
            <div className='card-hero'>
              <div className='card-info'>
                <h1>Things to do from home</h1>
                <button>Online Experiences</button>
              </div>
            </div>
          </div>
        </div>
        <div className='shop-airbnb'>
          <div className='header'>
            <h1>Shop Airbnb gift cards</h1>
            <button>Learn more</button>
          </div>
          <div className='shop-hero'>
            <img
              className='img'
              src='/cards.png'
              alt='Shop Airbnb gift cards'
            />
          </div>
        </div>
        <div className='questions'>
          <div className='questions-header'>
            <h1>Questions about hosting?</h1>
            <button>Ask a Superhost</button>
          </div>
        </div>

        <div className='pre-footer'>
          <div className='section-header'>
            <h1 className='section-title'>Inspiration for future getaways</h1>
            <div className='pre-footer-nav'>
              <div className='footer-nav'>
                {LandingData.destinations.map((d, i) => (
                  <h1
                    style={{
                      opacity: i > 0 ? '50%' : '',
                      textDecoration: d.id === 1 ? 'underline' : ''
                    }}
                  >
                    {d.title}
                  </h1>
                ))}
              </div>
            </div>
          </div>
          <div className='destination-container'>
            <div className='destinations'>
              {[1, 2, 3].map(order => (
                <div key={order} className='row'>
                  {LandingData.locations
                    .filter(l => l.order === order)
                    .map((l, i) => (
                      <div key={l.title} className='location'>
                        <h1
                          style={{
                            textDecoration:
                              l.order === 3 && i === 3 ? 'underline' : ''
                          }}
                          className='location-title'
                        >
                          {l.title}
                        </h1>
                        <p className='location-place'>{l.subtitle}</p>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

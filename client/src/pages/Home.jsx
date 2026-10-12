import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllLocations } from '../services/LocationsAPI'
import '../App.css'

const Home = () => {
  const [locations, setLocations] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'CityPulse Queens | Locations'
    getAllLocations().then(setLocations).catch((err) => setError(err.message))
  }, [])

  return (
    <main className='page-shell'>
      <section className='hero'>
        <p className='eyebrow'>WEB103 · VIRTUAL COMMUNITY SPACE</p>
        <h1>Find your next Queens event.</h1>
        <p>
          Explore four neighborhoods and discover community events, food, art,
          music, workshops, and more.
        </p>
      </section>

      {error && <p className='error-box'>{error}</p>}

      <section className='location-grid'>
        {locations.map((location) => (
          <Link
            key={location.id}
            className={`location-card accent-${location.accent}`}
            to={`/locations/${location.id}`}
          >
            <div className='location-icon'>{location.icon}</div>
            <div>
              <p className='small-label'>EXPLORE</p>
              <h2>{location.name}</h2>
              <p>{location.tagline}</p>
              <span className='explore-link'>View events →</span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default Home

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { getLocation, getLocationEvents } from '../services/LocationsAPI'
import '../App.css'

const LocationDetails = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [events, setEvents] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getLocation(id), getLocationEvents(id)])
      .then(([locationData, eventsData]) => {
        setLocation(locationData)
        setEvents(eventsData)
        document.title = `CityPulse Queens | ${locationData.name}`
      })
      .catch((err) => setError(err.message))
  }, [id])

  if (error) {
    return <main className='page-shell'><p className='error-box'>{error}</p></main>
  }

  if (!location) {
    return <main className='page-shell'><p>Loading location...</p></main>
  }

  return (
    <main className='page-shell'>
      <Link className='back-link' to='/'>← Back to locations</Link>

      <section className={`location-hero accent-${location.accent}`}>
        <div className='location-icon large'>{location.icon}</div>
        <div>
          <p className='eyebrow'>QUEENS NEIGHBORHOOD</p>
          <h1>{location.name}</h1>
          <p>{location.description}</p>
        </div>
      </section>

      <div className='section-heading'>
        <div>
          <p className='small-label'>WHAT'S HAPPENING</p>
          <h2>Events in {location.name}</h2>
        </div>
        <span>{events.length} events</span>
      </div>

      <section className='event-grid'>
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </section>
    </main>
  )
}

export default LocationDetails

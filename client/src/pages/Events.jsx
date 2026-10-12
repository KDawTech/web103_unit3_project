import React, { useEffect, useMemo, useState } from 'react'
import EventCard from '../components/EventCard'
import { getAllEvents } from '../services/EventsAPI'
import { getAllLocations } from '../services/LocationsAPI'
import '../App.css'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'CityPulse Queens | All Events'
    Promise.all([getAllEvents(), getAllLocations()])
      .then(([eventsData, locationsData]) => {
        setEvents(eventsData)
        setLocations(locationsData)
      })
      .catch((err) => setError(err.message))
  }, [])

  const visibleEvents = useMemo(() => {
    if (filter === 'all') return events
    return events.filter((event) => String(event.location_id) === filter)
  }, [events, filter])

  return (
    <main className='page-shell'>
      <section className='hero compact'>
        <p className='eyebrow'>ALL EVENTS</p>
        <h1>What's happening across Queens.</h1>
      </section>

      <div className='filter-bar'>
        <label>
          Filter by neighborhood
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            <option value='all'>All locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>{location.name}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className='error-box'>{error}</p>}

      <section className='event-grid'>
        {visibleEvents.map((event) => <EventCard key={event.id} event={event} />)}
      </section>
    </main>
  )
}

export default Events

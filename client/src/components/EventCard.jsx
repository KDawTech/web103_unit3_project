import React from 'react'
import { countdownText, formatEventDate } from '../utilities/time'

const EventCard = ({ event }) => (
  <article className='event-card'>
    <div className='event-meta'>
      <span className='category-pill'>{event.category}</span>
      <span className='event-location'>{event.location_name}</span>
    </div>
    <h3>{event.name}</h3>
    <p>{event.description}</p>
    <div className='event-footer'>
      <strong>{formatEventDate(event.event_time)}</strong>
      <span className={countdownText(event.event_time).startsWith('Ended') ? 'past' : 'upcoming'}>
        {countdownText(event.event_time)}
      </span>
    </div>
  </article>
)

export default EventCard

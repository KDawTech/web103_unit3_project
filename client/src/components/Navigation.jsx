import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => (
  <nav className='top-nav'>
    <Link className='brand' to='/'>CITY<span>PULSE</span> QUEENS</Link>
    <div className='nav-links'>
      <Link to='/'>Locations</Link>
      <Link to='/events'>All Events</Link>
    </div>
  </nav>
)

export default Navigation

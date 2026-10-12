import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import LocationDetails from './pages/LocationDetails'
import Events from './pages/Events'
import './App.css'

const App = () => {
  const element = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/locations/:id', element: <LocationDetails /> },
    { path: '/events', element: <Events /> }
  ])

  return (
    <div className='app'>
      <Navigation />
      {element}
    </div>
  )
}

export default App

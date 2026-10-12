import 'dotenv/config'
import express from 'express'
import path from 'path'
import locationsRouter from './routes/locations.js'
import eventsRouter from './routes/events.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use('/api/locations', locationsRouter)
app.use('/api/events', eventsRouter)
app.get('/api/health', (_req, res) => res.json({ ok: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
  app.get('/*', (_req, res) => res.sendFile(path.resolve('public', 'index.html')))
}

app.listen(PORT, () => {
  console.log(`CityPulse server listening on http://localhost:${PORT}`)
})

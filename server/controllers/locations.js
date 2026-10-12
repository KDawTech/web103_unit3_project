import { pool } from '../config/database.js'

const getLocations = async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations ORDER BY id')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocationById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations WHERE id=$1', [Number(req.params.id)])
    if (!result.rows[0]) return res.status(404).json({ error: 'Location not found' })
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getEventsByLocation = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.*, l.name AS location_name
       FROM events e
       JOIN locations l ON l.id=e.location_id
       WHERE e.location_id=$1
       ORDER BY e.event_time`,
      [Number(req.params.id)]
    )
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getLocations, getLocationById, getEventsByLocation }

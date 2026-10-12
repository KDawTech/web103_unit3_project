import { pool } from '../config/database.js'

const getEvents = async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, l.name AS location_name
      FROM events e
      JOIN locations l ON l.id=e.location_id
      ORDER BY e.event_time
    `)
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export default { getEvents }

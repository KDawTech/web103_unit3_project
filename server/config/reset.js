import 'dotenv/config'
import { pool } from './database.js'

const resetDatabase = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS events')
    await pool.query('DROP TABLE IF EXISTS locations')

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        icon VARCHAR(20) NOT NULL,
        tagline VARCHAR(180) NOT NULL,
        description TEXT NOT NULL,
        accent VARCHAR(30) NOT NULL
      )
    `)

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
        name VARCHAR(140) NOT NULL,
        description TEXT NOT NULL,
        event_time TIMESTAMP NOT NULL,
        category VARCHAR(80) NOT NULL
      )
    `)

    const locationResult = await pool.query(`
      INSERT INTO locations (name, slug, icon, tagline, description, accent)
      VALUES
        ('Astoria', 'astoria', '🎬', 'Food, film, and neighborhood nights', 'Explore community events around Astoria, from outdoor movie nights to food and culture gatherings.', 'purple'),
        ('Flushing', 'flushing', '🏮', 'Culture, markets, and celebration', 'Discover festivals, food events, and community gatherings in one of Queens most energetic neighborhoods.', 'red'),
        ('Jamaica', 'jamaica', '🎵', 'Music, art, and local energy', 'Find concerts, workshops, and community events centered around Jamaica and Jamaica Avenue.', 'gold'),
        ('Long Island City', 'long-island-city', '🌆', 'Waterfront, art, and skyline views', 'Browse creative events, waterfront meetups, and arts programming across Long Island City.', 'blue')
      RETURNING id
    `)

    const ids = locationResult.rows.map(row => row.id)

    await pool.query(`
      INSERT INTO events (location_id, name, description, event_time, category)
      VALUES
        ($1, 'Astoria Outdoor Movie Night', 'A free community movie screening with local food vendors.', '2026-10-16 19:30:00', 'Film'),
        ($1, 'Ditmars Food Walk', 'Sample bites from neighborhood restaurants and bakeries.', '2026-10-20 17:00:00', 'Food'),
        ($2, 'Flushing Night Market', 'Evening market featuring food stalls, crafts, and music.', '2026-10-17 18:00:00', 'Market'),
        ($2, 'Queens Culture Celebration', 'Performances and community booths celebrating local cultures.', '2026-10-24 13:00:00', 'Culture'),
        ($3, 'Jamaica Avenue Live', 'Local artists perform an outdoor evening concert.', '2026-10-18 18:30:00', 'Music'),
        ($3, 'Community Tech Workshop', 'A beginner-friendly digital skills and career workshop.', '2026-10-22 16:00:00', 'Workshop'),
        ($4, 'LIC Waterfront Photo Walk', 'A guided sunset photo walk through Gantry Plaza and nearby streets.', '2026-10-19 17:30:00', 'Photography'),
        ($4, 'Open Studios Weekend', 'Meet local artists and explore working studios across LIC.', '2026-10-25 12:00:00', 'Art')
    `, [ids[0], ids[1], ids[2], ids[3]])

    console.log('locations and events tables reset and seeded successfully')
  } catch (error) {
    console.error('reset failed:', error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

resetDatabase()

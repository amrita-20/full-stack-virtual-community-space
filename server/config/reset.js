import { pool } from './database.js';
import data from '../data/data.js';

const createLocationsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS locations;

    CREATE TABLE IF NOT EXISTS locations (
        location_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
`
try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 locations table created successfully')
  }
catch (err) {
    console.error('⚠️ error creating locations table', err)
}
}

const seedLocationsTable = async () => {
    await createLocationsTable()
    data.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (location_id, name) VALUES ($1, $2)'
        }
        const values = [
            location.location_id,
            location.name
        ]
        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting locations', err)
                return
            }
        
            console.log(`✅ ${location.name} added successfully`)
        })
    })
}

//seedLocationsTable();

const createEventsTable = async () => {
    const createTableQuery = `
    DROP TABLE IF EXISTS events;

    CREATE TABLE IF NOT EXISTS events (
        event_id SERIAL PRIMARY KEY,
        location_id INT REFERENCES locations(location_id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        type VARCHAR(100),
        image VARCHAR(255),
        status VARCHAR(20)
    )
`
try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 events table created successfully')
  }
catch (err) {
    console.error('⚠️ error creating events table', err)
}
}

const seedEventsTable = async () => {
    await createEventsTable()
    data.forEach((location) => {
        location.events.forEach((event) => {
            const insertQuery = {
                text: 'INSERT INTO events (event_id, location_id, name, description, date, time, type, image, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' 
            }
            const values = [
                event.event_id,
                location.location_id,  // Foreign key reference to locations
                event.name,
                event.description,
                event.date,
                event.time,
                event.type,
                event.image,
                event.status
            ]
            pool.query(insertQuery, values, (err, res) => {
                if (err) {
                    console.error('⚠️ error inserting events', err)
                    return
                }
            
                console.log(`✅ ${event.name} added successfully`)
            })
        })
    })
}

seedEventsTable();


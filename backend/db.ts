import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost', 
  port: 5432,
  database: 'postgres', 
})

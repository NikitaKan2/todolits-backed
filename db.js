import pg from 'pg';

const pool = new pg.Pool({
  user: 'oem',
  password: 'user',
  host: 'localhost',
  post: '5432',
  database: 'task',
});

export default pool;

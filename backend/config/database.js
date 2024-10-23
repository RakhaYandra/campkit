const { Pool } = require('pg'); // or any other database client
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'campkit',
  password: '12345678',
  port: 5432, // default port for PostgreSQL
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Create users table
const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `);
};

// Create a new user
const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, hashedPassword]
  );
  return rows[0];
};

// Find user by username
const findUserByUsername = async (username) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0];
};

module.exports = { createUsersTable, createUser, findUserByUsername };
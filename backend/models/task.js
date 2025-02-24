const pool = require('../config/db');

// Create tasks table
const createTasksTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      is_complete BOOLEAN DEFAULT FALSE,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
    )
  `);
};

// Create a new task
const createTask = async (title, description, userId) => {
  const { rows } = await pool.query(
    'INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, description, userId]
  );
  return rows[0];
};

// Get tasks by user ID
const getTasksByUser = async (userId) => {
  const { rows } = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  return rows;
};

// Update a task
const updateTask = async (id, title, description, is_complete) => {
  const { rows } = await pool.query(
    'UPDATE tasks SET title = $1, description = $2, is_complete = $3 WHERE id = $4 RETURNING *',
    [title, description, is_complete, id]
  );
  return rows[0];
};

// Delete a task
const deleteTask = async (id) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
};

module.exports = { createTasksTable, createTask, getTasksByUser, updateTask, deleteTask };
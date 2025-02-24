const express = require('express');
const cors = require('cors');
const { createUsersTable } = require('./models/user');
const { createTasksTable } = require('./models/task'); // <-- Fix path if needed

const pool = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Database initialization
const initializeDatabase = async () => {
  try {
    await pool.query('BEGIN');
    await createUsersTable();
    await createTasksTable();
    await pool.query('COMMIT');
    console.log('Database initialized successfully');
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Database initialization failed:', error);
  }
};

// Initialize Database and start server
const startServer = async () => {
  await initializeDatabase();
  
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

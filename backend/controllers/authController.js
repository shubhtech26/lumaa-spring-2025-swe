const { createUser, findUserByUsername } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Register a new user
const register = async (req, res) => {
  try {
    const user = await createUser(req.body.username, req.body.password);
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

// Login user
const login = async (req, res) => {
  const user = await findUserByUsername(req.body.username);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};

module.exports = { register, login };
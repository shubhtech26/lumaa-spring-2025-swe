const express = require('express');
const { createTask, getTasksByUser, updateTask, deleteTask } = require('../models/task');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res) => {
  const tasks = await getTasksByUser(req.userId);
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const task = await createTask(req.body.title, req.body.description, req.userId);
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  is_complete: boolean;
  const task = await updateTask(req.params.id, req.body.title, req.body.description, req.body.is_complete);
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await deleteTask(req.params.id);
  res.status(204).send();
});

module.exports = router;
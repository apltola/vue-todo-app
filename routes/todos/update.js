const express = require('express');
const requireAuth = require('../../middlewares/requireAuth');
const { Todo } = require('../../models/Todo');
const router = express.Router();

router.put('/api/todos/:id', requireAuth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).send('todo not found...');
  }

  todo.set({
    title: req.body.title,
    completed: req.body.completed,
  });
  await todo.save();

  const todos = await Todo.find({
    userId: req.currentUser.id,
  });

  res.status(201).send(todos);
});

module.exports = {
  updateTodoRouter: router,
};

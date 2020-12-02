const express = require('express');
const requireAuth = require('../../middlewares/requireAuth');
const { Todo } = require('../../models/Todo');
const router = express.Router();

router.delete('/api/todos/:id', requireAuth, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  const todos = await Todo.find({
    userId: req.currentUser.id,
  });
  res.send(todos);
});

module.exports = {
  deleteTodoRouter: router,
};

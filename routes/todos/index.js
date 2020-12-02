const express = require('express');
const requireAuth = require('../../middlewares/requireAuth');
const { Todo } = require('../../models/Todo');
const { User } = require('../../models/User');
const router = express.Router();

router.get('/api/todos', requireAuth, async (req, res) => {
  const todos = await Todo.find({
    userId: req.currentUser.id,
  });

  res.send(todos);
});

router.post('/api/resetdb', async (req, res) => {
  await Todo.deleteMany({});
  await User.deleteMany({});
  res.send('deleted everything...');
});

module.exports = {
  indexTodoRouter: router,
};

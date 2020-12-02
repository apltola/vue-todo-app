const express = require('express');
const { Todo } = require('../../models/Todo');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const validateRequest = require('../../middlewares/validateRequest');
const requireAuth = require('../../middlewares/requireAuth');

router.post(
  '/api/todos',
  requireAuth,
  [body('title').not().isEmpty().withMessage('todo title must be provided')],
  validateRequest,
  async (req, res) => {
    const todo = new Todo({
      title: req.body.title,
      userId: req.currentUser.id,
    });
    await todo.save();

    const todos = await Todo.find({
      userId: req.currentUser.id,
    });

    res.status(201).send(todos);
  }
);

module.exports = {
  createTodoRouter: router,
};

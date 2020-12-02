const express = require('express');
const { User } = require('../../models/User');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validateRequest');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

router.post(
  '/api/auth/signup',
  [
    body('username')
      .not()
      .isEmpty()
      .isString()
      .withMessage('username must be provided'),
    body('password').not().isEmpty().withMessage('password must be provided'),
  ],
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: 'Username already in use!' });
    }

    const user = new User({
      username,
      password,
      usernameLowercase: username.toLowerCase(),
    });
    await user.save();

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      config.JWT_SECRET
    );

    req.session.jwt = userJwt;

    res.status(201).send({ id: user.id, username: user.username });
  }
);

module.exports = {
  signupRouter: router,
};

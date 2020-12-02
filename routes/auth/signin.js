const express = require('express');
const { User } = require('../../models/User');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validateRequest');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const router = express.Router();

router.post(
  '/api/auth/signin',
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

    const user = await User.findOne({
      usernameLowercase: username.toLowerCase(),
    });
    if (!user) {
      return res.status(400).send({ error: 'Incorrect username or password' });
    }

    const passwordsMatch = await user.comparePassword(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).send({ error: 'Incorrect username or password' });
    }

    // generate jwt
    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      config.JWT_SECRET
    );

    req.session.jwt = userJwt;
    //res.send(user);
    res.send({ username: user.username, id: user.id });
  }
);

module.exports = {
  signinRouter: router,
};

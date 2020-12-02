const express = require('express');

const router = express.Router();

router.get('/api/auth/currentuser', async (req, res) => {
  /* if (!req.currentUser) {
    return res.send({ currentUser: null });
  }

  const user = await User.findById(req.currentUser.id).populate('todos');
  console.log('user ', user); */

  res.send({
    currentUser: req.currentUser || null,
  });
});

module.exports = {
  currentUserRouter: router,
};

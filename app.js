const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { indexTodoRouter } = require('./routes/todos');
const { createTodoRouter } = require('./routes/todos/new');
const { deleteTodoRouter } = require('./routes/todos/delete');
const { updateTodoRouter } = require('./routes/todos/update');
const { signupRouter } = require('./routes/auth/signup');
const { currentUserRouter } = require('./routes/auth/currentUser');
const { signinRouter } = require('./routes/auth/signin');
const { signoutRouter } = require('./routes/auth/signout');
const currentUser = require('./middlewares/currentUser');

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
  })
);

app.use(currentUser);
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(indexTodoRouter);
app.use(createTodoRouter);
app.use(deleteTodoRouter);
app.use(updateTodoRouter);

app.get('/api/hello', (req, res) => {
  res.send('hello hello hello');
});

module.exports = { app };

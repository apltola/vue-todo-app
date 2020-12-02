const { app } = require('./app');
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const config = require('./config');

const connectToDb = async () => {
  try {
    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('🥭 Connected to M0ngo');
  } catch (error) {
    console.log('Mongo error -> ', error);
    throw new Error('db connection failed');
  }
};

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(__dirname, 'client', 'dist');
  app.use('/', express.static(dist));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dist, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('server listening @ 3001');
});

connectToDb();

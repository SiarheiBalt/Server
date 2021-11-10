const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');

const { createRoomsData } = require('./utils/data/initdata.utils');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRoutes);

app.use('/api/rooms', roomsRoutes);

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {});
  } catch (err) {
    console.log('Server error', err.message);
    process.exit(1);
  }
}

start();

// createRoomsData();

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));

const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const { createRoomsData } = require('./utils/data/initdata.utils');

const app = express(); //сервер

app.use(express.json({ extended: true })); //чтоб корректо парсил body

app.use('/api/auth', require('./routes/auth.routes')); // роут авторизации

app.use('/api/rooms', require('./routes/rooms.routes'));

const PORT = config.get('port') || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {});
  } catch (err) {
    console.log('Server error', err.message);
    process.exit(1); // Выход из процесса node.js
  }
}

start();

// createRoomsData();

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));

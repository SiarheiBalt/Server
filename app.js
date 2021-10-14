const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express(); //сервер

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

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));

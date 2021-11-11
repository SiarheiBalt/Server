const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');
const recordRoutes = require('./routes/records.routes');
const instrumentsRoutes = require('./routes/instruments.routes');
const ordersRoutes = require('./routes/orders.routes');

const { createDB } = require('./utils/data/initdata.utils');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/instruments', instrumentsRoutes);
app.use('/api/orders', ordersRoutes);

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

// createDB();

app.listen(5000, () => console.log(`App has been started on port ${PORT}...`));

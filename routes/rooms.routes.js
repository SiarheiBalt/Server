const { Router } = require('express');
const Rooms = require('../models/Rooms');
const router = Router();

router.get('/', async (req, res) => {
  try {
    // const rooms = await Rooms.find(); // весь кластер
    // const rooms = await Rooms.updateOne({ name: 'big' }, { $set: { id: '1' } }); // Обновление елемента
    // const rooms = await Rooms.find({ 'dates.id': 'qq3qukznb' });
    // const rooms = await Rooms.find({ 'dates.reserveTime.hour': '10:00' });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

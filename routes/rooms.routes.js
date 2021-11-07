const { Router } = require('express');
const Rooms = require('../models/Rooms');
const router = Router();

router.get('/', async (req, res) => {
  try {
    // const rooms = await Rooms.updateOne({ name: 'big' }, { $set: { id: '2' } }); // Обновление елемента

    // const rooms = await Rooms.find({ name: 'big' }, { dates: 1 }); //Выводит только dates

    const rooms = await Rooms.find(
      // Находит день в выбранной комнате
      { name: 'big' },
      {
        dates: {
          $elemMatch: { id: 'wxefguo9r' },
        },
      }
    );

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

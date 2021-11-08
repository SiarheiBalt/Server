const { Router } = require('express');
const Rooms = require('../models/Rooms');
const router = Router();

// Взять данные о комнатах
router.get('/all', async (req, res) => {
  try {
    // const room = await Rooms.updateOne(
    //   { name: 'big' },
    //   { $set: { dates: obj } }
    // ); // Обновление елемента

    // const rooms = await Rooms.find({ name: 'big' }, { dates: 1 }); //Выводит только dates

    const room = await Rooms.find();

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// Взять день в выбранной комнате
router.get('/dates', async (req, res) => {
  const { name, dayId } = req.body;
  try {
    const room = await Rooms.find(
      { name },
      {
        dates: {
          $elemMatch: { id: dayId },
        },
      }
    );

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// Зарезервировать выбранное время
router.post('/time', async (req, res) => {
  const {} = req.body;
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

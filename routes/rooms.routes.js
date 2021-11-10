const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const Rooms = require('../models/Rooms');
const router = Router();
const {
  addReserveToNewDates,
  checkTime,
} = require('../utils/commonFunc.utils');
const { createUserOrder } = require('../utils/rooms.utils');

// /api/rooms/all
router.get('/all', async (req, res) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/rooms/dates    Take a day in a chosen room
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
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/rooms/time   Reserve selected time
router.post('/time', isAuth, async (req, res) => {
  const { name, dayId, reserveTime, userId } = req.body;

  const room = await Rooms.find({ name }); //find room
  const roomDates = room[0].dates; //array with dates in the room

  const isTimeReserved = !checkTime(roomDates, dayId, reserveTime);
  if (isTimeReserved) {
    return res.status(400).json({ message: 'time is not free' });
  }

  const newDates = addReserveToNewDates(roomDates, dayId, reserveTime, userId);

  await Rooms.updateOne({ name }, { $set: { dates: newDates } });

  const body = req.body;
  createUserOrder(body);

  res.status(201).json({ message: 'time reserved' });
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

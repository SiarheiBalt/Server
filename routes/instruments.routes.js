const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const Instruments = require('../models/Instruments');
const router = Router();
const {
  addReserveToNewDates,
  checkTime,
} = require('../utils/commonFunc.utils');
const { createUserOrder } = require('../utils/rooms.utils');

// /api/instruments/all
router.get('/all', async (req, res) => {
  try {
    console.log(Instruments);
    const instruments = await Instruments.find();
    res.status(200).json(instruments);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/instruments/dates   Take a day in a chosen room
router.get('/dates', async (req, res) => {
  const { name, dayId } = req.body;
  try {
    const instrument = await Instruments.find(
      { name },
      {
        dates: {
          $elemMatch: { id: dayId },
        },
      }
    );
    res.status(200).json(instrument);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/instruments/time   Reserve selected time
router.post('/time', isAuth, async (req, res) => {
  const { name, dayId, reserveTime, userId } = req.body;

  const instrument = await Instruments.find({ name });
  const instrumentDates = instrument[0].dates;

  const isTimeReserved = !checkTime(instrumentDates, dayId, reserveTime);
  if (isTimeReserved) {
    return res.status(400).json({ message: 'time is not free' });
  }

  const newDates = addReserveToNewDates(
    instrumentDates,
    dayId,
    reserveTime,
    userId
  );
  console.log(newDates);
  await Instruments.updateOne({ name }, { $set: { dates: newDates } });

  const body = req.body;
  createUserOrder(body);

  res.status(201).json({ message: 'time reserved' });
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const Records = require('../models/Records');
const router = Router();
const {
  addReserveToNewDates,
  checkTime,
} = require('../utils/commonFunc.utils');
const { createUserOrder } = require('../utils/rooms.utils');

// /api/record/all
router.get('/all', async (req, res) => {
  try {
    const records = await Records.find();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/record/dates   Take a day in a chosen room
router.post('/dates', async (req, res) => {
  const { name, dayId } = req.body;
  try {
    const records = await Records.find(
      { name },
      {
        dates: {
          $elemMatch: { id: dayId },
        },
      }
    );
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/record/time   Reserve selected time
router.post('/time', isAuth, async (req, res) => {
  const { name, dayId, reserveTime, userId } = req.body;

  const records = await Records.find({ name });
  const recordsDates = records[0].dates;

  const isTimeReserved = !checkTime(recordsDates, dayId, reserveTime);
  if (isTimeReserved) {
    return res.status(400).json({ message: 'time is not free' });
  }

  const newDates = addReserveToNewDates(
    recordsDates,
    dayId,
    reserveTime,
    userId
  );
  await Records.updateOne({ name }, { $set: { dates: newDates } });

  const body = req.body;
  createUserOrder(body);

  res.status(201).json({ message: 'time reserved' });
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

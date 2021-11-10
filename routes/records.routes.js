const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const { checkReserveError } = require('../middleWare/records.middleware');
const Records = require('../models/Records');
const router = Router();
const { addReserveToNewDates } = require('../utils/commonFunc.utils');
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

// /api/record/dates    Take a day in a chosen room
router.get('/dates', async (req, res) => {
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
router.post('/time', isAuth, checkReserveError, async (req, res) => {
  const { name, dayId, reserveTime, userId } = req.body;
  const body = req.body;

  const records = await Records.find({ name }); //find room
  const recordsDates = records[0].dates; //array with dates in the room

  const newDates = addReserveToNewDates(
    recordsDates,
    dayId,
    reserveTime,
    userId
  );
  await Records.updateOne({ name }, { $set: { dates: newDates } });

  createUserOrder(body);

  res.status(201).json({ message: 'time reserved' });
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

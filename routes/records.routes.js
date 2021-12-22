const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const router = Router();
const {
  addReserveToNewDates,
  checkTime,
} = require('../utils/commonFunc.utils');
const { createUserOrder } = require('../utils/rooms.utils');
const {
  getAllRecords,
  getDayInChosenRecord,
  getDatesInRecord,
  updateDatesRecord,
} = require('../db/records');

// /api/record/all
router.get('/all', async (req, res) => {
  try {
    const records = await getAllRecords();
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/record/dates   Take a day
router.post('/dates', async (req, res) => {
  const { name, dayId } = req.body;
  try {
    const records = await getDayInChosenRecord(name, dayId);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

// /api/record/time   Reserve selected time
router.post('/time', isAuth, async (req, res) => {
  const { name, dayId, reserveTime, userId } = req.body;

  const recordsDates = await getDatesInRecord(name);

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
  await updateDatesRecord(name, newDates);

  const body = req.body;
  createUserOrder(body);

  res.status(201).json({ message: 'time reserved' });
  try {
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

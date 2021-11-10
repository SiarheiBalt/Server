const Records = require('../models/Records');
const { checkTime } = require('../utils/commonFunc.utils');

exports.checkReserveError = async (req, res, next) => {
  const { name, dayId, reserveTime } = req.body;

  const record = await Records.find({ name }); //find room
  const recordDates = record[0].dates; //array with dates in the room

  const isTimeFree = checkTime(recordDates, dayId, reserveTime);
  if (!isTimeFree) {
    return res.status(400).json({ message: 'time is not free' });
  }
  next();
};

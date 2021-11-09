const Rooms = require('../models/Rooms');
const { checkTime } = require('../utils/commonFunc.utils');

exports.checkReserveError = async (req, res, next) => {
  const { name, dayId, reserveTime } = req.body;

  const room = await Rooms.find({ name }); //find room
  const roomDates = room[0].dates; //array with dates in the room

  const isTimeFree = checkTime(roomDates, dayId, reserveTime);
  if (!isTimeFree) {
    return res.status(400).json({ message: 'time is not free' });
  }
  next();
};

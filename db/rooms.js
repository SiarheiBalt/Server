const Rooms = require('../models/Rooms');

exports.getAllRooms = async () => {
  const response = await Rooms.find();
  return response;
};

exports.getDayInChosenRoom = async (name, dayId) => {
  const response = await Rooms.find(
    { name },
    {
      dates: {
        $elemMatch: { id: dayId },
      },
    }
  );
  return response;
};

exports.getDatesInRoom = async (name) => {
  const instrument = await Rooms.find({ name });
  const instrumentDates = instrument[0].dates;
  return instrumentDates;
};

exports.updateDatesRoom = async (name, newDates) => {
  await Rooms.updateOne({ name }, { $set: { dates: newDates } });
};

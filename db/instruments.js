const Instruments = require('../models/Instruments');

exports.getAllIinstruments = async () => {
  const response = await Instruments.find();
  return response;
};

exports.getDayInChosenInstrument = async (name, dayId) => {
  const response = await Instruments.find(
    { name },
    {
      dates: {
        $elemMatch: { id: dayId },
      },
    }
  );
  return response;
};

exports.getDatesInstrument = async (name) => {
  const instrument = await Instruments.find({ name });
  const instrumentDates = instrument[0].dates;
  return instrumentDates;
};

exports.updateDatesInstrument = async (name, newDates) => {
  await Instruments.updateOne({ name }, { $set: { dates: newDates } });
};

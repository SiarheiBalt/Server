const Records = require('../models/Records');

exports.getAllRecords = async () => {
  const response = await Records.find();
  return response;
};

exports.getDayInChosenRecord = async (name, dayId) => {
  const response = await Records.find(
    { name },
    {
      dates: {
        $elemMatch: { id: dayId },
      },
    }
  );
  return response;
};

exports.getDatesInRecord = async (name) => {
  const record = await Records.find({ name });
  const recordDates = record[0].dates;
  return recordDates;
};

exports.updateDatesRecord = async (name, newDates) => {
  await Records.updateOne({ name }, { $set: { dates: newDates } });
};

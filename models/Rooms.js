const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  rooms: [
    {
      dates: [
        {
          date: { type: String },
          dayofWeek: { type: String },
          monthName: { type: String },
          month: { type: String },
          year: { type: Number },
          reserveTime: [
            {
              hour: { type: String },
              isFree: { type: Boolean },
              customer: { type: null },
            },
          ],
          id: { type: String },
        },
      ],

      name: { type: String },
      id: { type: String },
    },
  ],
});

module.exports = model('Rooms', schema);

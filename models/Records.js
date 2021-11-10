const { Schema, model } = require('mongoose');

const schema = new Schema([
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
            customer: { type: Object },
          },
        ],
        id: { type: String },
      },
    ],

    name: { type: String },
    id: { type: String },
  },
]);

module.exports = model('Records', schema);

const { Schema, model } = require('mongoose');

const schema = new Schema([
  {
    dates: [
      {
        date: { type: Date },
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

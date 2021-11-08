const { Schema, model } = require('mongoose');

const schema = new Schema({
  type: { type: String },
  name: { type: String },
  dayId: { type: String },
  reservedTime: [{ type: String }],
  date: {
    date: { type: String },
    dayofWeek: { type: String },
    monthName: { type: String },
    month: { type: String },
    year: { type: String },
    id: { type: String },
  },
  orderId: { type: String },
  actionTime: { type: String },
});

module.exports = model('UserOrders', schema);

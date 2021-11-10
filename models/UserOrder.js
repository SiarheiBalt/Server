const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  type: { type: String },
  name: { type: String },
  dayId: { type: String },
  reserveTime: [{ type: String }],
  date: {
    date: { type: Number },
    monthName: { type: String },
  },
  orderId: { type: String },
  actionTime: { type: String },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('UserOrder', schema);

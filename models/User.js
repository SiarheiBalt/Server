const { Schema, model, Types } = require('mongoose'); // беру поля

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  UserOrders: [{ type: Types.ObjectId, ref: 'UserOrder' }],
});

module.exports = model('User', schema);

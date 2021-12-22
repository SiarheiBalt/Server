const Orders = require('../models/UserOrder');

exports.getUserOrders = async (userId) => {
  return await Orders.find({ owner: userId });
};

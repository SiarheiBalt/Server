const Orders = require('../models/UserOrder');

exports.getAllOrders = async () => {
  const orders = await Orders.find();
  return orders;
};

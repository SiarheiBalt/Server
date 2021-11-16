const UserOrder = require('../models/UserOrder');

exports.createUserOrder = async (body) => {
  console.log(body);
  const { type, name, dayId, reserveTime, date, orderId, actionTime, userId } =
    body;

  const userOrder = new UserOrder({
    type,
    name,
    dayId,
    reserveTime,
    date,
    actionTime,
    owner: userId,
  });
  await userOrder.save();
};

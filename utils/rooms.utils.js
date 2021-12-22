const UserOrder = require('../models/UserOrder');

exports.createUserOrder = async (body) => {
  const {
    type,
    name,
    dayId,
    reserveTime,
    date,
    actionTime,
    userEmail,
    userId,
  } = body;

  const userOrder = new UserOrder({
    type,
    name,
    dayId,
    reserveTime,
    date,
    actionTime,
    userEmail,
    owner: userId,
  });
  await userOrder.save();
};

exports.delUserOrder = async (id) => {
  const succes = await UserOrder.deleteOne({ _id: id });
  return succes.deletedCount;
};

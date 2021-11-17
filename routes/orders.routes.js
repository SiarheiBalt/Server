const { Router } = require('express');

const { isAuth } = require('../middleWare/auth.middleware');
const Orders = require('../models/UserOrder');
const router = Router();
const { delUserOrder } = require('./../utils/rooms.utils');
const { cancelReserveToNewDates } = require('./../utils/commonFunc.utils');

const Rooms = require('../models/Rooms');
const Records = require('../models/Records');
const Instruments = require('../models/Instruments');

const db = {
  rooms: Rooms,
  records: Records,
  instruments: Instruments,
};

router.post('/all', isAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ owner: req.body.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

router.post('/del', isAuth, async (req, res) => {
  try {
    const orderId = req.body._id;
    const wasOrderDel = await delUserOrder(orderId);
    if (wasOrderDel) {
      const { type, name, dayId, reserveTime } = req.body;

      const typeServiceItem = await db[type].find({ name });
      const typeServiceItemDates = typeServiceItem[0].dates;

      const newDates = cancelReserveToNewDates(
        typeServiceItemDates,
        dayId,
        reserveTime
      );

      await db[type].updateOne({ name }, { $set: { dates: newDates } });

      res.status(200).json({ message: 'order was canceled' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

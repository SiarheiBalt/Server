const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const router = Router();
const Orders = require('../models/UserOrder');

router.post('/orders', isAuth, async (req, res) => {
  try {
    const orders = await Orders.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

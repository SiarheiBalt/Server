const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const Orders = require('../models/UserOrder');
const router = Router();

router.post('/all', isAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ owner: req.body.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

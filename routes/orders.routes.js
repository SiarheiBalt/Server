const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const Orders = require('../models/UserOrder');
const router = Router();

router.get('/', isAuth, async (req, res) => {
  try {
    const orders = await Orders.find({ owner: req.user.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

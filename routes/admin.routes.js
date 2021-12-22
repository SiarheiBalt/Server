const { Router } = require('express');
const { isAuth } = require('../middleWare/auth.middleware');
const router = Router();
const { getAllOrders } = require('./../db/orders');

router.post('/orders', isAuth, async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong, please try again' });
  }
});

module.exports = router;

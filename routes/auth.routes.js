const { Router } = require('express');
const User = require('../models/User');
const router = Router();
const { check } = require('express-validator');
const { createUser, createToken } = require('../utils/auth.utils');
const {
  checkRegistrationError,
  checkLoginError,
} = require('../middleWare/auth.middleware');

//  /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum length 6 characters').isLength({ min: 6 }),
    check('name', 'Minimum length 3 characters').isLength({ min: 3 }),
  ],
  checkRegistrationError,
  (req, res) => {
    const { email, password, name } = req.body;
    createUser(email, password, name);
    res.status(201).json({ message: 'User created' });
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  checkLoginError,
  async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const token = createToken(user);
    res.json({
      token,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }
);

module.exports = router;

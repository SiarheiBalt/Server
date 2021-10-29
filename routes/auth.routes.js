const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();
const { check, validationResult } = require('express-validator');
const { createUser, createToken } = require('./utils/authUtils');

//  /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum length 6 characters').isLength({ min: 6 }),
    check('name', 'Minimum length 3 characters').isLength({ min: 3 }),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        });
      }
      const { email, password, name } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status
          .apply(400)
          .json({ message: 'This user already exists' });
      }

      createUser(email, password, name);

      res.status(201).json({ message: 'User created' });
    } catch (err) {
      res.status(500).json({ message: 'This user already exists' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Enter password').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data',
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User is not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Invalid password please try again' });
      }
      const token = createToken(user);

      res.json({ token, userId: user.id, name: user.name });
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

module.exports = router;

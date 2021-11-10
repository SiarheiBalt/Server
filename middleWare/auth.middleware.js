const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.checkRegistrationError = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect registration data',
      });
    }
    const { email } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json({ message: 'This user already exists' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'This user already exists' });
  }
};

exports.checkLoginError = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

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
    next();
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.isAuth = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.body.auth;
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' });
    }

    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Нет авторизации' });
  }
};

const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = Router();
const { check, validationResult } = require('express-validator');

//  /api/auth/register
router.post(
  '/register',
  [
    //валидация
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum length 6 characters').isLength({ min: 6 }),
    check('name', 'Minimum length 3 characters').isLength({ min: 3 }),
  ],

  async (req, res) => {
    // console.log('body:', req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data',
        });
      }
      const { email, password, name } = req.body;
      const candidate = await User.findOne({ email }); // Проверка есть ли такой email
      if (candidate) {
        return res.status
          .apply(400)
          .json({ message: 'This user already exists' });
      }

      const hashePassword = await bcrypt.hash(password, 12); //шифрование пароля
      const user = new User({ email, password: hashePassword, name }); //создание пользователя

      await user.save();

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
    //валидатор - можно удалить и написать на фронте
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

      const user = await User.findOne({ email }); //Ищу пользователя

      if (!user) {
        return res.status(400).json({ message: 'User is not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password); //Сравниваю пароли

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Invalid password please try again' });
      }
      // формирование токена
      const token = jwt.sign(
        { userId: user.id }, // данные которые будут зашифрованы
        config.get('jwtSecret'), //секретный ключ
        { expiresIn: '1h' } //через сколько jwt токен перестанет существовать
      );

      res.json({ token, userId: user.id, name: user.name }); //передаю на фронт
    } catch (err) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

module.exports = router;

// Router is middleWare

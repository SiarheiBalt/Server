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
    check('email', 'Некоректный email').isEmail(),
    check('password', 'Минимальная длинна 6 символов').isLength({ min: 6 }),
    check('name', 'Минимальная длинна 3 символа').isLength({ min: 3 }),
  ],

  async (req, res) => {
    // console.log('body:', req.body);
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при регистрации',
        });
      }
      const { email, password, name } = req.body;
      const candidate = await User.findOne({ email }); // Проверка есть ли такой email
      if (candidate) {
        return res.status
          .apply(400)
          .json({ message: 'Такой пользователь уже существует' });
      }

      const hashePassword = await bcrypt.hash(password, 12); //шифрование пароля
      const user = new User({ email, password: hashePassword, name }); //создание пользователя

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (err) {
      res.status(500).json({ message: 'Такой пользователь уже существует' });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при входе в систему',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email }); //Ищу пользователя

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }
      const isMatch = await bcrypt.compare(password, user.password); //Сравниваю пароли

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль попробуйте снова' });
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

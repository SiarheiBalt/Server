const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');

exports.createUser = async (email, password, name) => {
  const difficultyEncryption = 12;
  const hashePassword = await bcrypt.hash(password, difficultyEncryption); //шифрование пароля
  const user = new User({ email, password: hashePassword, name }); //создание пользователя
  await user.save();

  return user;
};

exports.createToken = (user) => {
  return jwt.sign(
    { userId: user.id }, // данные которые будут зашифрованы
    config.get('jwtSecret'), //секретный ключ
    { expiresIn: '1h' } //через сколько jwt токен перестанет существовать
  );
};

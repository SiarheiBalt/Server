const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');

const tokenTerm = config.get('expiresIn');

exports.createUser = async (email, password, name) => {
  const role = 'user';
  const difficultyEncryption = 12;
  const hashePassword = await bcrypt.hash(password, difficultyEncryption); //шифрование пароля
  const user = new User({ email, password: hashePassword, name, role }); //создание пользователя
  await user.save();

  return user;
};

exports.createToken = (user) => {
  return jwt.sign(
    { userId: user.id }, // данные которые будут зашифрованы
    config.get('jwtSecret'), //секретный ключ
    { expiresIn: tokenTerm } //через сколько jwt токен перестанет существовать
  );
};

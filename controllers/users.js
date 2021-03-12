const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError, Conflict } = require('../errors/errors');
const { SECRET_KEY } = require('../config');
const {
  DataNotFoundMessage,
  ErrorRegistrationMessage,
} = require('../errors/errorsMessages');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(DataNotFoundMessage))
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { username, password } = req.body;
  //  перед созданием пользователя, проверим, что такого логина нет в базе и выдадим понятную ошибку
  User.findOne({ username })
    .then((userExist) => {
      if (userExist) {
        return Promise.reject(new Conflict(ErrorRegistrationMessage));
      }
      //  Cоздаем пользователя. Пароль хешируем
      return bcrypt
        .hash(password, 10)
        .then((hash) =>
          User.create({
            username,
            password: hash,
          })
        )
        .then((user) => res.send({ data: user.omitPrivate() }));
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { username, password } = req.body;
  const sevenDays = 3600000 * 24 * 7;

  return User.findUserByCredentials(username, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: '7d',
      });
      res
        .cookie('jwt', token, {
          maxAge: sevenDays,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token, user })
        .end();
    })
    .catch(next);
};

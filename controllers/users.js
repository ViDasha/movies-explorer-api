const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const handleErrors = require('../errors/handle-errors');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages, jwtDevSecret } = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.userNotFoundError));
      } else {
        res.send(user);
      }
    })
    .catch((err) => handleErrors(err, res, next));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findOneAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(errorMessages.userNotFoundError));
      }
      res.send(user);
    })
    .catch((err) => handleErrors(err, res, next));
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    // вернём записанные в базу данные
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    // данные не записались, вернём ошибку
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(errorMessages.userConflictError));
      }
      handleErrors(err, res, next);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // ошибка аутентификации
      if (!user) {
        return next(new UnauthorizedError(errorMessages.loginError));
      }
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret,
        { expiresIn: '7d' },
      );

      // вернём токен
      res.send({ token });
    })
    .catch((err) => next(err));
};
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const { jwtDevSecret } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages } = require('../utils/constants');
const { handleErrors } = require('../errors/handle-errors');

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

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.userNotFoundError));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.userConflictError));
      } else {
        handleErrors(err, res, next);
      }
    });
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
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.userConflictError));
      } else {
        handleErrors(err, res, next);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // ошибка аутентификации
      if (!user) {
        next(new UnauthorizedError(errorMessages.loginError));
      } else {
      // аутентификация успешна! пользователь в переменной user
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : jwtDevSecret,
          { expiresIn: '7d' },
        );

        // вернём токен
        res.send({ token });
      }
    })
    .catch((err) => next(err));
};

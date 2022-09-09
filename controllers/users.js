const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const handleErrors = require('../errors/handle-errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
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
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      res.send(user);
    })
    .catch((err) => handleErrors(err, res, next));
};
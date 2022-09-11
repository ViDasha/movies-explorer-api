const ValidationError = require('./validation-error');
const { errorMessages } = require('../utils/constants');

module.exports.handleErrors = (err, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new ValidationError(errorMessages.dataError));
  } else {
    next(err);
  }
};

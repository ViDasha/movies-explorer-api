const { celebrate, Joi } = require('celebrate');
const { patternURL } = require('../utils/constants');

module.exports.validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    director: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    duration: Joi.number().required(),
    image: Joi.string().required().pattern(patternURL),
    trailerLink: Joi.string().required().pattern(patternURL),
    thumbnail: Joi.string().required().pattern(patternURL),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.vaidateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

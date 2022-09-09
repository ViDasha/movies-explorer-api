const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: [
      isURL,
      {
        message: 'Неверный формат ссылки',
      },
    ],
  },
  trailerLink: {
    type: String,
    require: true,
    validate: [
      isURL,
      {
        message: 'Неверный формат ссылки',
      },
    ],
  },
  thumbnail: {
    type: String,
    require: true,
    validate: [
      isURL,
      {
        message: 'Неверный формат ссылки',
      },
    ],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    required: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  }
}, {
  versionKey: false, // You should be aware of the outcome after set to false
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);
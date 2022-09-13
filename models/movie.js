const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [
      isURL,
      {
        message: 'Неверный формат ссылки',
      },
    ],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [
      isURL,
      {
        message: 'Неверный формат ссылки',
      },
    ],
  },
  thumbnail: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
    ref: 'movie',
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false, // You should be aware of the outcome after set to false
});

// создаём модель и экспортируем её
module.exports = mongoose.model('movie', movieSchema);

const Movie = require('../models/movie');
const { handleErrors } = require('../errors/handle-errors');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const { errorMessages, messages } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch((err) => handleErrors(err, res, next));
};

module.exports.createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    director,
    year,
    image,
    country,
    description,
    duration,
    trailerLink,
    thumbnail,
    movieId,
  } = req.body;

  const ownerId = req.user._id; // _id станет доступен

  Movie.create({
    nameRU,
    nameEN,
    director,
    year,
    image,
    country,
    description,
    duration,
    trailerLink,
    thumbnail,
    movieId,
    owner: ownerId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => handleErrors(err, res, next));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId) // удаление фильма по Id
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(errorMessages.movieNotFoundError));
      }

      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError(errorMessages.movieDeleteError));
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: messages.deleteMovie }));
    })
    .catch((err) => handleErrors(err, res, next));
};

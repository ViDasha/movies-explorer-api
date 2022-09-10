const Movie = require('../models/movie');
const handleErrors = require('../errors/handle-errors');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

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
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм с указанным _id не найден'));
      }

      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError('Вы не можете удалить этот фильм'));
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch((err) => handleErrors(err, res, next));
};


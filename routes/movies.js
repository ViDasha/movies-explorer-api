const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validateCreateMovie,
  vaidateDeleteMovie,
} = require('../middlewares/validation');

router.get('/', getMovies); // возвращает все сохранённые текущим  пользователем фильмы

router.post('/', validateCreateMovie, createMovie); // создаёт фильм с переданными в теле параметрами

router.delete('/:movieId', vaidateDeleteMovie, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;

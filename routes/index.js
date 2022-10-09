const router = require('express').Router();
const authRouters = require('./auth');
const movies = require('./movies');
const users = require('./users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

router.use('/', authRouters);
router.use(auth);
router.use('/movies', movies);
router.use('/users', users);
router.use((req, res, next) => {
  next(new NotFoundError(errorMessages.wrongPathError));
});

module.exports = router;

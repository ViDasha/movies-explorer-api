const authRouters = require('./auth');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');

module.exports = function (app) {
  app.use('/', authRouters);
  app.use(auth);
  app.use('/movies', require('./movies'));
  app.use('/users', require('./users'));
  app.all('*', (req, res, next) => {
    next(new NotFoundError(errorMessages.wrongPathError));
  });
};
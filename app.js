require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const NotFoundError = require('./errors/not-found-error');
const { validateSignIn, validateSignUp } = require('./middlewares/validation');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const rateLimited = require('./middlewares/limited');
const { nameMongoDB, errorMessages } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(nameMongoDB, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger);

app.use('/', rateLimited);

app.post('/signin', validateSignIn, login);

app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.wrongPathError));
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: errorMessages.serverError });
  }
  next();
});

app.listen(PORT);
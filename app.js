require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const rateLimited = require('./middlewares/limited');
const { nameMongoDB } = require('./utils/constants');
const routes = require('./routes');
const defaultError = require('./errors/default-error');

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

app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(defaultError);

app.listen(PORT);

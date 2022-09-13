module.exports.patternURL = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.nameMongoDB = 'mongodb://localhost:27017/moviesdb';

module.exports.errorMessages = {
  authorizationError: 'Необходима авторизация',
  loginError: 'Неправильные почта или пароль',
  movieNotFoundError: 'Фильм с указанным _id не найден',
  movieDeleteError: 'Вы не можете удалить этот фильм',
  userNotFoundError: 'Пользователь по указанному _id не найден',
  userConflictError: 'Регистрация по существующему E-mail',
  wrongPathError: 'Страница не найдена',
  serverError: 'На сервере произошла ошибка',
  dataError: 'Переданы некорректные данные',
};

module.exports.messages = {
  deleteMovie: 'Фильм удален',
};

module.exports.jwtDevSecret = 'dev-secret';

module.exports.allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://vinodarya.movies.nomoredomains.sbs',
  'https://vinodarya.movies.nomoredomains.sbs',
  'http://api.vinodarya.movies.nomoredomains.sbs',
  'https://api.vinodarya.movies.nomoredomains.sbs',
  'https://localhost:3000',
];

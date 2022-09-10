const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'http://vinodarya.movies.nomoredomains.sbs',
  'https://vinodarya.movies.nomoredomains.sbs',
  'http://api.vinodarya.movies.nomoredomains.sbs',
  'https://api.vinodarya.movies.nomoredomains.sbs',
  'https://localhost:3000',
];

module.exports = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.send();
    return;
  }
  next();
});
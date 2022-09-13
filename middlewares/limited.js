const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  delayMs: 0,
  max: 100,
  messages: 'Вы сделали слишком много запросов за 15 минут.',
  headers: true,
});

module.exports = rateLimiter;

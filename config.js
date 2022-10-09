const mongoDefaultURL = 'mongodb://localhost:27017/moviesdb';

module.exports.mongoURL = process.env.MONGO_URL || mongoDefaultURL;

module.exports.jwtDevSecret = 'dev-secret';

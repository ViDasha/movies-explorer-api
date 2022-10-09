const router = require('express').Router();
const { getUser, updateProfile } = require('../controllers/users');
const { validateUserProfile } = require('../middlewares/validation');

router.get('/me', getUser); // возвращает информацию о пользователе (email и имя)

router.patch('/me', validateUserProfile, updateProfile); // обновляет информацию о пользователе (email и имя)

module.exports = router;

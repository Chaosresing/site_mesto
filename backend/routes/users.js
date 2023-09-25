const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
// импорт всех контролеров для работы с пользователями
const {
  getUsers, getUsersById, getInfoMe, updatetUsers, updatetAvatar, exitUser
} = require('../controllers/users');
// валидация приходящих на сервер данных
const celebrates = require('../middlewares/celebrateUser');

// обработка запроса получения всех пользователей из файла
router.get('/users', getUsers);

// обработка запроса получения инфы о себе
router.get('/users/me', getInfoMe);

// обработка запроса обновления данных пользователя
router.patch('/users/me', celebrates.updateUser, updatetUsers);

// обработка запроса обновления аватара пользователя
router.patch('/users/me/avatar', celebrates.updateAvatar, updatetAvatar);

// обработка запроса получения одного пользователя по id
router.get('/users/:userId', celebrates.getUser, getUsersById);

// экспортируем модуль
module.exports = router;

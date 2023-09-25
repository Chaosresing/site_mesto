const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
const usersRouters = require('./users'); // импортируем модуль роутеров пользователей
const usersCards = require('./cards'); // импортируем модуль роутеров карточек
const auth = require('../middlewares/auth'); // мидлевар защиты роутов от тех кто не авторизовался
const NotFoundErrors = require('../errors/notFoundErrors'); // подключаем класс ошибок 404
const celebrates = require('../middlewares/celebrateUser'); // валидация приходящих на сервер данных

// импорт всех контролеров для работы с пользователями
const { createUser, login, exitUser} = require('../controllers/users');

// обработка запроса регистрации нового пользователя
router.post('/signup', celebrates.login, createUser);

// обработка запроса авторизации пользователя
router.post('/signin', celebrates.login, login);

// обработка запроса выхода из учетной записи
router.post('/exit',  exitUser);

// роуты ниже этой записи защищены от входа незарегистрированных пользователей
router.use(auth);

router.use('/', usersRouters); // подключаем обработку роутеров пользователей
router.use('/cards', usersCards); // подключаем обработку роутеров карточек

// обработка несуществующего роута
router.use(() => {
  throw new NotFoundErrors('Маршрут не найден');
});

module.exports = router;

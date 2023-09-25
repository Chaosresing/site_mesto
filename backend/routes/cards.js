const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
// импорт всех контролеров для работы с пользователями
const {
  getCards, createCards, deleteCard, createLike, deleteLike,
} = require('../controllers/cards');
// валидация приходящих на сервер данных
const celebrates = require('../middlewares/celebrateСards');

// обработка запроса получения всех карточек
router.get('/', getCards);

// обработка запроса создания карточки
router.post('/', celebrates.createCards, createCards);

// обработка запроса  на удаления карточки
router.delete('/:cardId', celebrates.getCards, deleteCard);

// обработка запроса  поставить лайк
router.put('/:cardId/likes', celebrates.getCards, createLike);

// обработка запроса  удалить лайк
router.delete('/:cardId/likes', celebrates.getCards, deleteLike);

// экспортируем модуль
module.exports = router;

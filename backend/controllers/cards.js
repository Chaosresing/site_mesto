const Card = require('../models/cards'); // подключаем модель пользователей
const BadRequestError = require('../errors/badRequestError'); // подключаем класс ошибок 400
const ForbiddenError = require('../errors/forbiddenError'); // подключаем класс ошибок 403
const NotFoundErrors = require('../errors/notFoundErrors'); // подключаем класс ошибок 404

// получить все карточки
const getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    if (!cards) {
      next(new NotFoundErrors({ message: 'Карточки не найдены' }));
      return;
    }
    return res.status(200).send(cards);
  })
  .catch((err) => {
    next(err);
  });

// создать карточку
const createCards = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  return Card.create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('переданы некорректные данные карточки'));
        return;
      }
      next(err);
    });
};

// удалить карточку
const deleteCard = (req, res, next) => {
  const owner = req.user._id;
  console.log(owner);
  // проверка наличия карточки и прав на удаление
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundErrors('Карточка не найдена'));
        return;
      }

      if (card.owner.toString() !== owner) {
        next(new ForbiddenError('Вы не можите удалить чужую карточку'));
        return;
      }

      return Card.deleteOne(card)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id карточки'));
        return;
      }
      next(err);
    });
};

// поставить лайк
const createLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundErrors('Карточка не найдена'));
        return;
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

// удалить лайк
const deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundErrors('Карточка не найдена'));
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCard,
  createLike,
  deleteLike,
};

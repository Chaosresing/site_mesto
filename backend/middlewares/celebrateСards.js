const { celebrate, Joi } = require('celebrate'); // библиотека валидации
Joi.objectId = require('joi-objectid')(Joi); // для избежания ошибки objectId

const createCards = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

const getCards = celebrate({
  params: Joi.object().keys({
    cardId: Joi.objectId(),
  }),
});

module.exports = {
  createCards,
  getCards,
};

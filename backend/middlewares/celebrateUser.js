const { celebrate, Joi } = require('celebrate'); // библиотека валидации
Joi.objectId = require('joi-objectid')(Joi); // для избежания ошибки objectId

// данные пользователя
const login = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

// валидация id пользователя из параметра
const getUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

// обновление пользователя
const updateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// обновление аватара
const updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

module.exports = {
  login,
  getUser,
  updateUser,
  updateAvatar,
};

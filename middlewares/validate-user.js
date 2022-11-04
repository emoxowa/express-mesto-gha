const { celebrate, Joi } = require("celebrate");
const { REGEX } = require("../utils/constants");

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(RegExp(REGEX)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(RegExp(REGEX)),
  }),
});

module.exports = {
  validateLogin,
  validateUserCreate,
  validateUserId,
  validateUserUpdate,
  validateAvatar,
};

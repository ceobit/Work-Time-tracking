const { Joi } = require('celebrate');

const accountSignUp = {
  body: Joi.object().keys({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(6),
  }),
};

module.exports.accountSignUp = accountSignUp;

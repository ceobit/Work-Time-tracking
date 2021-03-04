const { Joi } = require('celebrate');

const accountSignIn = {
  body: Joi.object().keys({
    login: Joi.string()
        .required().min(2).max(40),
    password: Joi.string()
      .required().min(8),
  }),
};

module.exports.accountSignIn = accountSignIn;

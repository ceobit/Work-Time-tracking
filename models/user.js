const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/errors');
const { ErrorLoginOrPassMessage } = require('../errors/errorsMessages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  login: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

// userSchema.path('email').validate((email) => validator.isEmail(email), ErrorEmailMessage);

userSchema.statics.findUserByCredentials = function (login, password, next) {
  return this.findOne({ login }).select('+password')
    .orFail(() => new UnauthorizedError(ErrorLoginOrPassMessage))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(ErrorLoginOrPassMessage));
        }
        return user;
      }))
    .catch(next);
};

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);

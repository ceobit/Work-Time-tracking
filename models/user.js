const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/errors');
const { ErrorLoginOrPassMessage } = require('../errors/errorsMessages');

const userSchema = new mongoose.Schema({
  username: {
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

userSchema.statics.findUserByCredentials = function (username, password, next) {
  return this.findOne({ username })
    .select('+password')
    .orFail(() => new UnauthorizedError(ErrorLoginOrPassMessage))
    .then((user) =>
      bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthorizedError(ErrorLoginOrPassMessage));
        }
        return user;
      })
    )
    .catch(next);
};

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);

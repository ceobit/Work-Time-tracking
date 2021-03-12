const errorsHandler = (err, req, res, next) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || 'Server error' });
  next();
};

module.exports = errorsHandler;

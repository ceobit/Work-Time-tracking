const dateRecord = require('../models/dateRecord');
const NotFoundError = require('../errors/notFoundError');
const {DataNotFoundMessage} = require('../errors/errorsMessages');

module.exports.createRecord = (req, res, next) => {
  const { ...properties } = req.body;

  dateRecord.create({ ...properties, owner: req.user._id })
  .then((record) => res.send({ data: record }))
  .catch(next);
};

module.exports.getRecords = (req, res, next) => {
  dateRecord.find({ owner: req.user._id })
  .orFail(() => new NotFoundError(DataNotFoundMessage))
  .then((record) => res.send({ data: record }))
  .catch(next);
};
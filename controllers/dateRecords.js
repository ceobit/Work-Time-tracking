const Record = require('../models/dateRecord');
const NotFoundError = require('../errors/notFoundError');
const Forbidden = require('../errors/forbidden');
const {DataDeletedMessage} = require('../errors/errorsMessages');
const {NotAccessMessage} = require('../errors/errorsMessages');
const {DataNotFoundMessage} = require('../errors/errorsMessages');

const opts = { runValidators: true };

module.exports.createRecord = (req, res, next) => {
  const { ...properties } = req.body;

  Record.create({ ...properties, owner: req.user._id })
  .then((record) => res.send({ data: record }))
  .catch(next);
};

module.exports.getRecords = (req, res, next) => {
  Record.find({ owner: req.user._id })
  .orFail(() => new NotFoundError(DataNotFoundMessage))
  .then((record) => res.send({ data: record }))
  .catch(next);
};

module.exports.deleteRecord = (req, res, next) => {
  const { recordId } = req.params;

  Record.findById(recordId).select('+owner')
  .orFail(() => new NotFoundError(DataNotFoundMessage))
  .then((record) => {
    if (!record.owner.equals(req.user._id)) {
      throw new Forbidden(NotAccessMessage);
    }
    return Record.findByIdAndRemove({ _id: recordId })
    .then(() => res.send({ message: DataDeletedMessage }));
  })
  .catch(next);
};

module.exports.updateRecord = (req, res, next) => {
  const { ...properties } = req.body;
  const { recordId } = req.params;

  Record.findByIdAndUpdate(recordId, { ...properties }, opts)
  .orFail(() => new NotFoundError(DataNotFoundMessage))
  .then((record) => res.send({ data: record }))
  .catch(next);
};
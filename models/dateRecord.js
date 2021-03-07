const mongoose = require('mongoose');

const dateRecordSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 1,
  },
  duration: {
    type: String,
    required: true,
    minlength: 8,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('dateRecord', dateRecordSchema);

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
    timeStart: {
    type: Date,
    required: true,
  },
    timeFinish: {
      type: Date,
      required: true,
    },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    select: false,
  },
},
{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model('dateRecord', dateRecordSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uploadSchema = Schema(
  {
    replay: {
      type: Schema.Types.ObjectId,
      ref: 'Replay'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Upload', uploadSchema);

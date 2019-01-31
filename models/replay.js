const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replaySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  team1: {
    type: String,
    required: true
  },
  team2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  map: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  tournament: {
    type: String
  },
  gameLength: {
    type: Number
  },
  version: {
    type: Number
  },
  downloads: {
    type: Number
  },
  winner: {
    type: String
  },
  avgRating: {
    type: Number
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Replay', replaySchema);

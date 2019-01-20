const { Schema } = require('mongoose');

// const Schema = mongoose.Schema;

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
  releaseDate: {
    type: Date,
    required: true
  },
  map: {
    type: String,
    required: true
  }
});

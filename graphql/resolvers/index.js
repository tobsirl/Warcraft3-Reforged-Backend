const bcrypt = require('bcryptjs');

const Replay = require('../../models/replay');
const User = require('../../models/user');

const replays = async replayIds => {
  try {
    const replays = await Replay.find({ _id: { $in: replayIds } });
    replays.map(replay => ({
      ...replay._doc,
      _id: replay.id,
      releaseDate: new Date(replay._doc.releaseDate).toISOString(),
      submitter: user.bind(this, replay.submitter)
    }));
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      submittedReplay: replays.bind(this, user._doc.submittedReplay)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  replays: async () => {
    try {
      const replays = await Replay.find();
      replays.map(replay => ({
        ...replay._doc,
        releaseDate: new Date(replay._doc.releaseDate).toISOString(),
        submitter: user.bind(this, replay._doc.submitter)
      }));
    } catch (err) {
      throw err;
    }
  },

  createReplay: async args => {
    const replay = new Replay({
      title: args.replayInput.title,
      team1: args.replayInput.team1,
      team2: args.replayInput.team2,
      releaseDate: new Date(args.replayInput.releaseDate),
      map: args.replayInput.map,
      category: args.replayInput.category,
      tournament: args.replayInput.tournament,
      gameLength: args.replayInput.gameLength,
      version: args.replayInput.version,
      downloads: args.replayInput.downloads,
      winner: args.replayInput.winner,
      avgRating: args.replayInput.avgRating,
      submitter: '5c45be68faa221039006adc2'
    });
    let createdReplay;

    try {
      const result = await replay.save();
      createdReplay = {
        ...result._doc,
        _id: result._doc._id.toString(),
        releaseDate: new Date(replay._doc.releaseDate).toISOString(),
        submitter: user.bind(this, result._doc.submitter)
      };
      const user = await User.findById('5c45be68faa221039006adc2');

      if (!user) {
        throw new Error('User not found.');
      }
      user.submittedReplay.push(replay);
      await user.save();
      return createdReplay;
    } catch (err) {
      throw err;
    }
  },
  createUser: async args => {
    try {
      const user = await User.findOne({ email: args.userInput.email });

      if (user) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};

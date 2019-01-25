const { dateToString } = require('../../helpers/date');
const Replay = require('../../models/replay');
const User = require('../../models/user');
const { transformReplay } = require('./merge');

module.exports = {
  replays: async () => {
    try {
      const replays = await Replay.find();
      return replays.map(replay => transformReplay(replay));
    } catch (err) {
      throw err;
    }
  },

  createReplay: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
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
      submitter: req.userId
    });
    let createdReplay;

    try {
      const result = await replay.save();
      createdReplay = transformReplay(result);
      const userdata = await User.findById(req.userId);

      if (!userdata) {
        throw new Error('User not found.');
      }
      userdata.submittedReplay.push(replay);
      await userdata.save();
      return createdReplay;
    } catch (err) {
      throw err;
    }
  }
};

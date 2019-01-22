const bcrypt = require('bcryptjs');

const Replay = require('../../models/replay');
const User = require('../../models/user');

const replays = replayIds =>
  Replay.find({ _id: { $in: replayIds } })
    .then(replays =>
      replays.map(replay => ({
        ...replay._doc,
        _id: replay.id,
        releaseDate: new Date(replay._doc.releaseDate).toISOString(),
        submitter: user.bind(this, replay.submitter)
      }))
    )
    .catch(err => {
      throw err;
    });

const user = userId =>
  User.findById(userId)
    .then(user => ({
      ...user._doc,
      id: user.id,
      submittedReplay: replays.bind(this, user._doc.submittedReplay)
    }))
    .catch(err => {
      throw err;
    });

module.exports = {
  replays: () =>
    Replay.find()
      .then(replays =>
        replays.map(replay => ({
          ...replay._doc,
          releaseDate: new Date(replay._doc.releaseDate).toISOString(),
          submitter: user.bind(this, replay._doc.submitter)
        }))
      )
      .catch(err => {
        throw err;
      }),
  createReplay: args => {
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
    return replay
      .save()
      .then(result => {
        createdReplay = {
          ...result._doc,
          _id: result._doc._id.toString(),
          releaseDate: new Date(replay._doc.releaseDate).toISOString(),
          submitter: user.bind(this, result._doc.submitter)
        };
        return User.findById('5c45be68faa221039006adc2');
      })
      .then(user => {
        if (!user) {
          throw new Error('User not found.');
        }
        user.submittedReplay.push(replay);
        return user.save();
      })
      .then(result => createdReplay)
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createUser: args =>
    User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error('User exists already.');
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(result => ({ ...result._doc, password: null, _id: result.id }))
      .catch(err => {
        throw err;
      })
};

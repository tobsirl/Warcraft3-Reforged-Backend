const Replay = require('../../models/replay');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');

const replaysFetch = async replayIds => {
  try {
    const replays = await Replay.find({ _id: { $in: replayIds } });
    return replays.map(replay => transformReplay(replay));
  } catch (err) {
    throw err;
  }
};

const replayFetch = async replayId => {
  try {
    const replay = await Replay.findById(replayId);
    return transformReplay(replay);
  } catch (err) {
    throw err;
  }
};

const userFetch = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      id: user.id,
      submittedReplay: replaysFetch.bind(this, user._doc.submittedReplay)
    };
  } catch (err) {
    throw err;
  }
};

const transformReplay = replay => ({
  ...replay._doc,
  _id: replay.id,
  releaseDate: dateToString(replay._doc.releaseDate),
  submitter: userFetch.bind(this, replay.submitter)
});

const transformUpload = upload => ({
  ...upload._doc,
  _id: upload.id,
  user: userFetch.bind(this, upload._doc.user),
  replay: replayFetch.bind(this, upload._doc.replay),
  createdAt: dateToString(upload._doc.createdAt),
  updatedAt: dateToString(upload._doc.createdAt)
});

exports.transformReplay = transformReplay;
exports.transformUpload = transformUpload;

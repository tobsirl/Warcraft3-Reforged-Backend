const Upload = require('../../models/upload');
const Replay = require('../../models/replay');

const { transformUpload, transformReplay } = require('./merge');

module.exports = {
  uploads: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const uploads = await Upload.find();
      return uploads.map(upload => transformUpload(upload));
    } catch (err) {
      throw err;
    }
  },

  uploadReplay: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const fetchedReplay = await Replay.findOne({ _id: args.replayId });
      const upload = new Upload({
        user: req.userId,
        replay: fetchedReplay
      });
      const result = await upload.save();
      return transformUpload(result);
    } catch (err) {
      throw err;
    }
  },

  deleteUpload: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const upload = await Upload.findById(args.uploadId).populate('replay');
      const replay = transformReplay(replay.event);
      await Upload.deleteOne({ _id: args.uploadId });
      return upload;
    } catch (err) {
      throw err;
    }
  }
};

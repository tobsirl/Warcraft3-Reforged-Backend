const authResolver = require('./auth');
const replayResolver = require('./replays');
const uploadResolver = require('./uploads');

const rootResolver = {
  ...authResolver,
  ...replayResolver,
  ...uploadResolver
};

module.exports = rootResolver;
const SongsHandler = require('./handler'); // get handler for feature - songs
const routes = require('./routes'); // get routes for feature - songs

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    // eslint-disable-next-line max-len
    const songsHandler = new SongsHandler(service, validator); // validate the feature songs service
    server.route(routes(songsHandler)); // route http method songs to handler
  },
};

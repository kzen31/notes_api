const AlbumsHandler = require('./handler'); // get handler for feature - albums
const routes = require('./routes'); // get routes for feature - albums

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    // eslint-disable-next-line max-len
    const albumsHandler = new AlbumsHandler(service, validator); // validate the feature albums service
    server.route(routes(albumsHandler)); // route http method albums to handler
  },
};

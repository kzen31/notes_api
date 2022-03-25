/* eslint-disable spaced-comment */
require('dotenv').config(); // use dotenv

const Hapi = require('@hapi/hapi');

//plugin untuk fitur songs//
const SongsService = require('./services/postgres/SongsService'); // get service for feature songs
const SongsValidator = require('./validator/songs'); // get validator for feature songs
const songs = require('./api/songs');

//plugin untuk fitur albums//
const AlbumsService = require('./services/postgres/AlbumsService'); // get service for feature albums
const AlbumsValidator = require('./validator/albums'); // get validator for feature albums
const albums = require('./api/albums');

const init = async () => {
  const songsService = new SongsService();
  const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    // register plugin for feature - songs
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    // register plugin for feature - albums
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

init();

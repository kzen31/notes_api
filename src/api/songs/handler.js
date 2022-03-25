/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  // constructor for feaure - songs
  constructor(service, validator) {
    this._validator = validator;
    this._service = service;

    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongByQueryParamHandler = this.getSongByQueryParamHandler.bind(this);
  }

  // Handler for post add an song
  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title = 'untitled', year, performer, genre, duration, albumId,
      } = request.payload;

      const songId = await this._service.addSong({
        title, year, performer, genre, duration, albumId,
      });

      const response = h.response({
        status: 'success',
        message: 'Song is succeed to add',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Setting Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, our server is under maintenance. Please visit web in another time.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for get song by query
  async getSongByQueryParamHandler(request, h) {
    try {
      const { title, performer } = request.query;
      const songs = await this._service.getSongs(title, performer);
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Setting Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, our server is under maintenance. Please visit web in another time.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for get a song
  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Setting Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, our server is under maintenance. Please visit web in another time.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for update an song
  async putSongByIdHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {
        title, year, performer, genre, duration, albumId,
      } = request.payload;
      const { id } = request.params;

      await this._service.editSongById(id, {
        title, year, performer, genre, duration, albumId,
      });

      return {
        status: 'success',
        message: 'Song is succeed to update',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Setting Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, our server is under maintenance. Please visit web in another time.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for delete a song
  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id);

      return {
        status: 'success',
        message: 'Song is succeed to delete',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Setting Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Sorry, our server is under maintenance. Please visit web in another time.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = SongsHandler;

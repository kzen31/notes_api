/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  // constructor for feaure - albums
  constructor(service, validator) {
    this._validator = validator;
    this._service = service;

    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
  }

  // Handler for post adding album
  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const {
        name = 'untitled', year,
      } = request.payload;

      const albumId = await this._service.addAlbum({
        name, year,
      });

      const response = h.response({
        status: 'success',
        message: 'Album is succeed to add',
        data: {
          albumId,
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
        message: 'Sorry, our server is under maintenance. Please visit web in another time',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for get all albums
  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  // Handler for get an album
  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album,
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
        message: 'Sorry, our server is under maintenance. Please visit web in another time',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  // Handler for update an album
  async putAlbumByIdHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const {
        name, year,
      } = request.payload;
      const { id } = request.params;

      await this._service.editAlbumById(id, {
        name, year,
      });

      return {
        status: 'success',
        message: 'Album is succeed to update',
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

  // Handler for delete an album
  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);

      return {
        status: 'success',
        message: 'Album is succeed to delete',
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
        message: 'Sorry, our server is under maintenance. Please visit web in another time',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

module.exports = AlbumsHandler;

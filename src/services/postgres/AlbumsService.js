/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg'); // connection using pool
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModelSongs } = require('../../utils');

// class service for feature - albums
class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  // method for add album
  async addAlbum({
    name, year,
  }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Add Album is failed');
    }

    return result.rows[0].id;
  }

  // method for get albums
  async getAlbums() {
    const result = await this._pool.query('SELECT * FROM albums');
    return result.rows;
  }

  // method for get album
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album Not Found');
    }

    const resultSong = await this.getSongByIdAlbum(id);
    result.rows[0].songs = resultSong.map(mapDBToModelSongs);

    return result.rows[0];
  }

  async getSongByIdAlbum(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  // method for edit album by id
  async editAlbumById(id, {
    name, year,
  }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Fail to update Album. Id Not Found');
    }
  }

  // method for delete album by id
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Fail to delete Album. Id Not Found');
    }
  }
}

module.exports = AlbumsService;

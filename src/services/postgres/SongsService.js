/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg'); // connection using pool
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBToModel, mapDBToModelSongs } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

// class service for feature - Songs
class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  // method for add song
  async addSong({
    title, year, performer, genre, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Fail to add song');
    }

    return result.rows[0].id;
  }

  // method for get all songs
  async getSongs(title, performer) {
    if (title != null && performer != null) {
      const result = await this.getSongByTitlePerformer(title, performer);
      return result;
    } if (title != null && performer == null) {
      const result = await this.getSongByTitle(title);
      return result;
    } if (title == null && performer != null) {
      const result = await this.getSongByPerformer(performer);
      return result;
    }
    const result = await this._pool.query('SELECT * FROM songs');
    return result.rows.map(mapDBToModelSongs);
  }

  // method for get song by title
  async getSongByTitle(title) {
    const query = {
      text: 'SELECT * FROM songs WHERE LOWER(title) LIKE LOWER($1)',
      values: [`%${title}%`],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModelSongs);
  }

  // method for get song by performer
  async getSongByPerformer(performer) {
    const query = {
      text: 'SELECT * FROM songs WHERE LOWER(performer) LIKE LOWER($1)',
      values: [`%${performer}%`],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModelSongs);
  }

  // method for get song by title and performer
  async getSongByTitlePerformer(title, performer) {
    const query = {
      text: 'SELECT * FROM songs WHERE LOWER(performer) LIKE LOWER($1) AND LOWER(title) LIKE LOWER($2)',
      values: [`%${performer}%`, `%${title}%`],
    };
    const result = await this._pool.query(query);

    return result.rows.map(mapDBToModelSongs);
  }

  // method for get song by id
  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song Not Found');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  // method for edit song by id
  async editSongById(id, {
    title, year, performer, genre, duration, albumId,
  }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Fail to update song. Id Not Found');
    }
  }

  // method for delete song by id
  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Fail to delete dong. Id Not Found');
    }
  }
}

module.exports = SongsService;

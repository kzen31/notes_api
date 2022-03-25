/* eslint-disable camelcase */

// const mapDBToModel use for method GET song By Id
const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id, // convert key "album_id" (in database) to key "albumId" (in response)
});

// const mapDBToModelSongs use for method GET all songs (as task requirentment)
const mapDBToModelSongs = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

module.exports = { mapDBToModel, mapDBToModelSongs };

/* eslint-disable spaced-comment */
const { AlbumPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');// get configuration error

//setting validator for feature - albums
const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    // eslint-disable-next-line max-len
    const validationResult = AlbumPayloadSchema.validate(payload); // validate the payload feature - albums
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

//export albums validator
module.exports = AlbumsValidator;

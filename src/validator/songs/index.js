/* eslint-disable spaced-comment */
const { SongPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError'); // get configuration error

//setting validator for feature - songs
const SongsValidator = {
  validateSongPayload: (payload) => {
    // eslint-disable-next-line max-len
    const validationResult = SongPayloadSchema.validate(payload); // validate the payload feature - songs
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

//export songs validator
module.exports = SongsValidator;

const { validate, version } = require('uuid');

const isValidUUID = (uuid, expectedVersion = 4) => {
  if (!validate(uuid)) {
    return false;
  }

  return version(uuid) === expectedVersion;
};

module.exports = isValidUUID;
const bcrypt = require('bcrypt');

async function hashPassword(plainText) {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
}

async function comparePassword(plainText, hashed) {
  return bcrypt.compare(plainText, hashed);
}

module.exports = {
  hashPassword,
  comparePassword
};

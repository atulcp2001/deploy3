const crypto = require('crypto')

const generateVerifyToken = () => {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
  }

module.exports = generateVerifyToken
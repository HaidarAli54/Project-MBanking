const jwt = require('jsonwebtoken');

require('dotenv').config();
const generateVerifyToken = (payload) => {
  return jwt.sign({ id: payload.id, email: payload.email, fullname: payload.fullname, phone_number: payload.phone_number }, process.env.JWT_KEY, {
    expiresIn: "24h",
  });

};

module.exports = generateVerifyToken
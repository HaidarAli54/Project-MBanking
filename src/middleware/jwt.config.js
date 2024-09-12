const jwt = require('jsonwebtoken');

require('dotenv').config();
const generateVerifyToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

};
const verifyToken = (token) => {
    data = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      return decoded.userId;
    });
  
    return data;
  };

module.exports = {
  generateVerifyToken,
  verifyToken
}
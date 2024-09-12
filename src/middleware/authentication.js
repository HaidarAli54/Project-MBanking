const jwt = require('jsonwebtoken');

class TokenJwt {
    verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.sendStatus(403);
        }

        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = decoded;

            next();
        })
    }
}

module.exports = TokenJwt

const jwt = require('jsonwebtoken');

const checkUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

    jwt.verify(token, 'zz', (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide' });
        req.user = user;
        next();
    });
};

module.exports = { checkUser };

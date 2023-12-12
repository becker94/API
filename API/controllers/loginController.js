const { loginUser } = require('../models/loginModel');
const generateToken = require('../middlewares/jwt');

const login = (req, res) => {
    const { email, password } = req.body;

    loginUser(email, password, (response) => {
        if (response.status === 200) {
            res.status(200).json(response);
        } else if (response.status === 401) {
            res.status(401).json(response);
        } else if (response.status === 404) {
            res.status(404).json(response);
        } else {
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    });
};

module.exports = { login };

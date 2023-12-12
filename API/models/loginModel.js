const pool = require('../config/connect');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const generateToken = require('../middlewares/jwt');

const loginUser = async (email, password, callback) => {
    pool.getConnection(async (err, connection) => {
        if (err) throw err;

        const sqlSearch = "SELECT * FROM users WHERE email = ?";
        const search_query = mysql.format(sqlSearch, [email]);

        await connection.query(search_query, async (err, result) => {
            connection.release();

            if (err) throw err;

            if (result.length == 0) {
                console.log("Email does not exist");
                callback({ status: 404, error: "Email invalide" });
            } else {
                const hashedPassword = result[0].password;
                const passwordsMatch = await bcrypt.compare(password, hashedPassword);

                if (passwordsMatch) {
                    console.log("Login Successful");

                    const user = {

                        nom: result[0].nom,
                        email: result[0].email,

                    };
                    const token = generateToken(user);

                    callback({ status: 200, user, token, message: "Connexion Reussie" });
                } else {
                    console.log("Password Incorrect");
                    callback({ status: 401, error: "Incorrect password" });
                }
            }
        });
    });
};

module.exports = { loginUser };

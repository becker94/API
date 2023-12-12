

const connect = require('../config/connect');
const bcrypt = require('bcrypt');

const getAllUsers = (callback) => {
    connect.query("SELECT * FROM users", callback);
};

const getUserById = (id, callback) => {
    connect.query("SELECT * FROM users WHERE id = ?", [id], callback);
};

const addUser = (userData, callback) => {
    const { nom, email, password } = userData;


    connect.query("SELECT id FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            return callback(error, null);
        }


        if (results.length > 0) {
            return callback({ status: 400, error: "L'utilisateur avec cet e-mail existe déjà" }, null);
        }


        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err, null);
            }

            const sql = 'INSERT INTO users (nom, email, password) VALUES (?, ?, ?)';
            const values = [nom, email, hashedPassword];

            connect.query(sql, values, (insertError, insertResults) => {
                if (insertError) {
                    return callback(insertError, null);
                }

                const insertedUserId = insertResults.insertId;
                callback(null, insertedUserId);
            });
        });
    });
};
const updateUserById = (id, updatedUserData, callback) => {
    const { nom, email, password } = updatedUserData;

    const updateFields = [];
    const updateValues = [];

    if (nom) {
        updateFields.push('nom=?');
        updateValues.push(nom);
    }

    if (email) {
        updateFields.push('email=?');
        updateValues.push(email);
    }

    if (password) {

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err, null);
            }
            updateFields.push('password=?');
            updateValues.push(hashedPassword);


            continueUpdate();
        });
    } else {

        continueUpdate();
    }

    function continueUpdate() {
        if (updateFields.length === 0) {
            return callback({ status: 400, error: "Aucun champ à mettre à jour n'a été fourni" }, null);
        }

        const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id=?`;
        const finalUpdateValues = [...updateValues, id];

        connect.query(updateQuery, finalUpdateValues, callback);
    }
};


const deleteUserById = (id, callback) => {
    const deleteQuery = "DELETE FROM users WHERE id=?";

    connect.query(deleteQuery, [id], callback);
};


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUserById,
    deleteUserById,
};

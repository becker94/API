const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const getAllUsers = (req, res) => {
    userModel.getAllUsers((err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
        }
        res.json(rows);
    });
};

const getUserById = (req, res) => {
    const id = req.params.id;
    userModel.getUserById(id, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json(rows);
    });
};

const register = (req, res) => {
    const { nom, email, password } = req.body;

    userModel.addUser({ nom, email, password }, (err, insertedUserId) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur" });
        }

        res.json({
            message: "Utilisateur ajouté avec succès",
            userId: insertedUserId,
        });
    });
};

const updateUserById = (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    userModel.updateUserById(userId, updatedUserData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    });
};

const deleteUserById = (req, res) => {
    const userId = req.params.id;

    userModel.deleteUserById(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    register,
    updateUserById,
    deleteUserById,

};

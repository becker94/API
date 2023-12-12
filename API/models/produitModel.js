const connect = require('../config/connect');

const getAllProduit = (callback) => {
    connect.query("SELECT * FROM produits", callback);
};

const getProduitById = (id, callback) => {
    connect.query("SELECT * FROM produits WHERE id = ?", [id], callback);
};
const addProduit = (data, callback) => {
    connect.query("INSERT INTO produits (nom, prix, description) VALUES (?, ?, ?)", data, callback);
}

const updateProduit = (id, data, callback) => {
    connect.query("UPDATE produits SET nom=?, prix=?, description=? WHERE id=?", [...data, id], callback);
};
const deleteProduitById = (id, callback) => {
    const deleteQuery = "DELETE FROM produits WHERE id=?";

    connect.query(deleteQuery, [id], callback);
};
module.exports = {
    getAllProduit,
    getProduitById,
    addProduit,
    updateProduit,
    deleteProduitById,
};



const produitModel = require('../models/produitModel');
const { checkUserRole } = require('../middlewares/checkUser');


const getAllProduit = (req, res) => {
    produitModel.getAllProduit((err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

const getProduitById = (req, res) => {
    const id = req.params.id;
    produitModel.getProduitById(id, (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};
const addProduit = (req, res) => {
    const { nom, prix, description } = req.body;
    produitModel.addProduit([nom, prix, description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de l'ajout du produit" });
        }

        if (result.affectedRows > 0) {
            res.status(201).json({ message: "Produit ajouté avec succès" });
        } else {
            res.status(500).json({ error: "Erreur lors de l'ajout du produit" });
        }
    });
};


const updateProduit = (req, res) => {
    const id = req.params.id;
    const { nom, prix, description } = req.body;


    checkUserRole(req, res, () => {
        produitModel.updateProduit(id, [nom, prix, description], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
            }

            if (result.affectedRows > 0) {
                res.status(200).json({ message: "Produit mis à jour avec succès" });
            } else {
                res.status(404).json({ error: "Produit non trouvé" });
            }
        });
    });
};
const deleteProduitById = (req, res) => {
    const produitId = req.params.id;

    produitModel.deleteProduitById(produitId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression du produits" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "produits non trouvé" });
        }

        res.status(200).json({ message: "produits supprimé avec succès" });
    });
};

module.exports = {
    getAllProduit,
    getProduitById,
    addProduit,
    updateProduit,
    deleteProduitById,
};

const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

router.get('/', produitController.getAllProduit);
router.get('/:id', produitController.getProduitById);
router.post('/ajout', produitController.addProduit);
router.put('/:id', produitController.updateProduit);
router.delete('/:id', produitController.deleteProduitById);
module.exports = router;

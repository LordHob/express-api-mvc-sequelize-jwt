const express = require('express');
const router = express.Router();

//Importo modelo de datos
const ProvinciaController = require('../controllers/ProvinciaController');

// End-points CRUD movies
router.get('/', ProvinciaController.getAll);
router.get('/:id', ProvinciaController.getById);
router.get('/nombre/:nombre', ProvinciaController.getByName);
router.post('/', ProvinciaController.create);
router.put('/:id', ProvinciaController.update);
router.delete('/', ProvinciaController.deleteAll);
router.delete('/:id', ProvinciaController.delete);

module.exports = router;
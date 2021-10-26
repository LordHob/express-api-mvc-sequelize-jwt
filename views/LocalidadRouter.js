const express = require('express');
const router = express.Router();

//Importo modelo de datos
const LocalidadController = require('../controllers/LocalidadController');

// End-points CRUD movies
router.get('/', LocalidadController.getAll);
router.get('/:id', LocalidadController.getById);
router.get('/nombre/:nombre', LocalidadController.getByName);
router.post('/', LocalidadController.create);
router.put('/:id', LocalidadController.update);
router.delete('/', LocalidadController.deleteAll);
router.delete('/:id', LocalidadController.delete);

module.exports = router;
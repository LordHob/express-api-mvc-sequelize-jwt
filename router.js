const router = require('express').Router();

// Middlewares
const auth = require('./middlewares/auth');

//Importamos Routes definidas en views
const ProvinciaRouter = require('./views/ProvinciaRouter');
const LocalidadRouter = require('./views/LocalidadRouter');
const CaRouter = require('./views/CaRouter');
const UserRouter = require('./views/UserRouter');

//Rutas
router.use('/api', UserRouter); //Login and register routes
router.use('/provincias', ProvinciaRouter); //add auth
router.use('/localidades', LocalidadRouter); //add auth
router.use('/cas', CaRouter);

module.exports = router;
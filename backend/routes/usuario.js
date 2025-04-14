const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');


router.post('/', usuarioController.crearUsuario);


router.get('/', usuarioController.obtenerUsuarios);


router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;

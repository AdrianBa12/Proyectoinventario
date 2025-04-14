const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');

router.post('/', movimientoController.crearMovimiento);
router.get('/', movimientoController.obtenerMovimientos);

module.exports = router;
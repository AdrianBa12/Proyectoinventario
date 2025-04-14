const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimiento.controller');

router.post('/', movimientoController.crearMovimiento);
router.get('/', movimientoController.obtenerMovimientos);
router.put('/:id', movimientoController.actualizarMovimiento);
router.delete('/:id', movimientoController.eliminarMovimiento);

module.exports = router;
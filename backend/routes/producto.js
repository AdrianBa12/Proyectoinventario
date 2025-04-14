const express = require('express');
const router = express.Router();

const productoController = require('../controllers/producto.controller');

router.get('/', productoController.getProductos);
router.post('/', productoController.createProducto);
router.put('/:id', productoController.updateProducto);
router.delete('/:id', productoController.deleteProducto);

module.exports = router;

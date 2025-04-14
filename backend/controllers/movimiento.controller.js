const Movimiento = require('../models/movimiento.model');
const Producto = require('../models/producto.model');

exports.crearMovimiento = async (req, res) => {
  try {
    const { producto, tipo, cantidad } = req.body;

    const nuevoMovimiento = new Movimiento({ producto, tipo, cantidad });
    await nuevoMovimiento.save();

    // Actualizar inventario
    const productoActual = await Producto.findById(producto);
    if (!productoActual) return res.status(404).json({ message: 'Producto no encontrado' });

    productoActual.cantidad += tipo === 'ENTRADA' ? cantidad : -cantidad;
    await productoActual.save();

    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear movimiento', error });
  }
};

exports.obtenerMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find().populate('producto');
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error });
  }
};

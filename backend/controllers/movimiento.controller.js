const Movimiento = require('../models/movimiento.model');
const Producto = require('../models/producto.model');


exports.crearMovimiento = async (req, res) => {
  try {
    const { producto, tipo, cantidad } = req.body;

    
    if (cantidad <= 0) {
      return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
    }

    const productoActual = await Producto.findById(producto);
    if (!productoActual) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    
    if (tipo === 'SALIDA' && productoActual.cantidad < cantidad) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    const nuevoMovimiento = new Movimiento({
      producto,
      tipo,
      cantidad,
      usuario: req.user.id 
    });

    await nuevoMovimiento.save();

    
    productoActual.cantidad += tipo === 'ENTRADA' ? cantidad : -cantidad;
    await productoActual.save();

    res.status(201).json(nuevoMovimiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear movimiento', error: error.message });
  }
};


exports.obtenerMovimientos = async (req, res) => {
  try {
    const movimientos = await Movimiento.find()
      .populate('producto', 'nombre precio')
      .populate('usuario', 'username')
      .sort({ fecha: -1 }); 
    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener movimientos', error: error.message });
  }
};


exports.actualizarMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, cantidad, producto } = req.body;

    const movimiento = await Movimiento.findById(id);
    if (!movimiento) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    
    const productoActual = await Producto.findById(producto || movimiento.producto);
    if (!productoActual) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    
    productoActual.cantidad += movimiento.tipo === 'ENTRADA' ? -movimiento.cantidad : movimiento.cantidad;

   
    movimiento.tipo = tipo || movimiento.tipo;
    movimiento.cantidad = cantidad || movimiento.cantidad;
    movimiento.producto = producto || movimiento.producto;

    productoActual.cantidad += movimiento.tipo === 'ENTRADA' ? movimiento.cantidad : -movimiento.cantidad;

    await Promise.all([
      movimiento.save(),
      productoActual.save()
    ]);

    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar movimiento', error: error.message });
  }
};


exports.eliminarMovimiento = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByIdAndDelete(req.params.id);
    if (!movimiento) {
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    }

    
    const producto = await Producto.findById(movimiento.producto);
    if (producto) {
      producto.cantidad += movimiento.tipo === 'ENTRADA' ? -movimiento.cantidad : movimiento.cantidad;
      await producto.save();
    }

    res.json({ message: 'Movimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar movimiento', error: error.message });
  }
};
router.get('/dashboard', async (req, res) => {
    const totalProductos = await Producto.countDocuments();
    const productosBajoStock = await Producto.find({ cantidad: { $lt: 5 } });
    const ultimosMovimientos = await Movimiento.find().sort({ fecha: -1 }).limit(5).populate('producto');
  
    res.json({
      totalProductos,
      productosBajoStock,
      ultimosMovimientos
    });
  });
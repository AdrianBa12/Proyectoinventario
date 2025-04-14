const Producto = require('../models/producto.model');

exports.getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

exports.createProducto = async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.json({ mensaje: 'Producto creado correctamente' });
};

exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  await Producto.findByIdAndUpdate(id, req.body);
  res.json({ mensaje: 'Producto actualizado' });
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  await Producto.findByIdAndDelete(id);
  res.json({ mensaje: 'Producto eliminado' });
};

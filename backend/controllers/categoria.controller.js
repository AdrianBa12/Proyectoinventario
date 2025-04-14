const Categoria = require('../models/categoria.model');

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const guardada = await nuevaCategoria.save();
    res.status(201).json(guardada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const mongoose = require('mongoose');

const MovimientoSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
  tipo: { type: String, enum: ['ENTRADA', 'SALIDA'] },
  cantidad: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movimiento', MovimientoSchema);
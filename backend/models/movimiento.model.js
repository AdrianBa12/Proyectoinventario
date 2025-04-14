const mongoose = require('mongoose');

const MovimientoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  tipo: {
    type: String,
    enum: ['ENTRADA', 'SALIDA'],
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Movimiento', MovimientoSchema);
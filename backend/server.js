// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Para usar variables de entorno

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para leer JSON en las peticiones

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventario')
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
const productosRoutes = require('./routes/producto');
const categoriasRoutes = require('./routes/categorias');
const usuarioRoutes = require('./routes/usuario');
const movimientoRoutes = require('./routes/movimientos');
const authRoutes = require('./routes/auth'); 

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/movimientos', movimientoRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 API de Inventario funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});
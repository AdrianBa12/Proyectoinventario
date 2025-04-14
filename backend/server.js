const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();


app.use(cors());
app.use(express.json()); 


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventario')
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));


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
  res.send('API de Inventario funcionando');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
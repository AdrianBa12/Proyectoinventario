const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
dotenv.config();

const Categoria = require('../models/categoria.model');
const Usuario = require('../models/usuario.model');
const Movimiento = require('../models/movimiento.model');
const Producto = require('../models/producto.model');

const startSeeding = async () => {
  try {
    // 1. Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/inventario', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB para inserciones.');

    // 2. Limpieza de colecciones (opcional, comentar si no se desea borrar datos existentes)
    await Promise.all([
      Categoria.deleteMany({}),
      Producto.deleteMany({}),
      Usuario.deleteMany({}),
      Movimiento.deleteMany({})
    ]);
    console.log('🧹 Datos antiguos eliminados (si existían).');

    // 3. Insertar usuarios
    const usuarios = await Usuario.insertMany([
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        rol: 'ADMIN'
      },
      {
        username: 'empleado',
        password: await bcrypt.hash('empleado123', 10),
        rol: 'EMPLEADO'
      }
    ]);
    console.log('👥 Usuarios insertados:', usuarios.map(u => u.username));

    // 4. Insertar categorías
    const categorias = await Categoria.insertMany([
      { nombre: 'Electrónica', descripcion: 'Productos electrónicos modernos' },
      { nombre: 'Papelería', descripcion: 'Artículos de oficina y escolares' },
      { nombre: 'Alimentos', descripcion: 'Productos alimenticios envasados' }
    ]);
    console.log('📁 Categorías insertadas:', categorias.map(c => c.nombre));

    // 5. Insertar productos
    const productos = await Producto.insertMany([
      {
        nombre: 'Laptop Lenovo',
        descripcion: 'Intel i5, 8GB RAM, SSD 512GB',
        precio: 1800,
        stock: 12,
        categoria: categorias[0]._id // Electrónica
      },
      {
        nombre: 'Smartphone Samsung',
        descripcion: 'Galaxy S23 Ultra',
        precio: 2500,
        stock: 30,
        categoria: categorias[0]._id
      },
      {
        nombre: 'Cuaderno A4',
        descripcion: '100 hojas rayadas',
        precio: 8,
        stock: 100,
        categoria: categorias[1]._id // Papelería
      },
      {
        nombre: 'Café instantáneo',
        descripcion: 'Frasco de 250g',
        precio: 20,
        stock: 25,
        categoria: categorias[2]._id // Alimentos
      }
    ]);
    console.log('🛒 Productos insertados:', productos.map(p => p.nombre));

    // 6. Insertar movimientos (ejemplo con el primer producto)
    if (productos.length > 0) {
      const movimientos = await Movimiento.insertMany([
        {
          producto: productos[0]._id,
          tipo: 'ENTRADA',
          cantidad: 10,
          usuario: usuarios[0]._id // Admin realizó el movimiento
        },
        {
          producto: productos[0]._id,
          tipo: 'SALIDA',
          cantidad: 3,
          usuario: usuarios[1]._id // Empleado realizó el movimiento
        }
      ]);
      console.log('🔄 Movimientos insertados:', movimientos.length);
    }

    console.log('🎉 Base de datos poblada exitosamente!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error durante el seeding:', error);
    process.exit(1);
  }
};

startSeeding();

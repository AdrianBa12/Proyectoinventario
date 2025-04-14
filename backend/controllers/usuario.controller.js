const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');

// Controlador para crear usuario (registro)
exports.crearUsuario = async (req, res) => {
  try {
    const { username, password, rol } = req.body;

    // Validaciones básicas
    if (!username || !password || !rol) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ username });
    if (usuarioExistente) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el usuario
    const nuevoUsuario = new Usuario({
      username,
      password: hashedPassword,
      rol
    });

    await nuevoUsuario.save();

    // Responder sin enviar la contraseña (ni siquiera el hash)
    const usuarioRespuesta = {
      _id: nuevoUsuario._id,
      username: nuevoUsuario.username,
      rol: nuevoUsuario.rol,
      createdAt: nuevoUsuario.createdAt
    };

    res.status(201).json(usuarioRespuesta);

  } catch (error) {
    console.error('Error en crearUsuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para obtener todos los usuarios (solo ADMIN)
exports.obtenerUsuarios = async (req, res) => {
  try {
    
    if (req.user.rol !== 'ADMIN') {
      return res.status(403).json({ message: 'No autorizado' });
    }

    const usuarios = await Usuario.find().select('-password -__v'); // Excluye campos sensibles
    res.json(usuarios);

  } catch (error) {
    console.error('Error en obtenerUsuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });

  } catch (error) {
    console.error('Error en eliminarUsuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};
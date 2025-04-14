const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model.js'); // Asegúrate de tener este modelo

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Buscar usuario en la base de datos
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // 2. Comparar contraseña hasheada
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // 3. Generar token JWT (válido por 1 hora)
    const token = jwt.sign(
      { userId: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto_para_desarrollo', // Usa una variable de entorno en producción
      { expiresIn: '1h' }
    );

    // 4. Responder con token y datos del usuario (sin password)
    res.json({
      token,
      user: {
        username: usuario.username,
        rol: usuario.rol,
        _id: usuario._id
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = router;
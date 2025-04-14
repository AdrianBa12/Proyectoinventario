const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    req.user = jwt.verify(token, 'secreto123');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
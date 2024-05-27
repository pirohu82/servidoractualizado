const express = require('express');
const router = express.Router();
const { Usuarios, Alumnos, Profesors } = require('../models');

// Get all usuarios
router.get('/', async (req, res) => {
  const usuarios = await Usuarios.findAll();
  res.json(usuarios);
});

// Create a new usuario
router.post('/', async (req, res) => {
  const usuario = await Usuarios.create(req.body);
  res.json(usuario);
});

// Get a usuario by id
router.get('/:id_usuario', async (req, res) => {
  const usuario = await Usuarios.findByPk(req.params.id_usuario);
  res.json(usuario);
});

// Update a usuario by id
router.put('/:id_usuario', async (req, res) => {
  const usuario = await Usuarios.update(req.body, {
    where: { id_usuario: req.params.id_usuario }
  });
  res.json(usuario);
});

// Delete a usuario by id
router.delete('/:id_usuario', async (req, res) => {
  const usuario = await Usuarios.destroy({
    where: { id_usuario: req.params.id_usuario}
  });
  res.json(usuario);
});

router.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;

  try {
    const usuario = await Usuarios.findOne({ where: { nombre_usuario } });

    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    let datosUsuario;
    if (usuario.rol.toLowerCase() === 'alumno') {
      datosUsuario = await Alumnos.findOne({ where: { id_usuario: usuario.id_usuario } });
    } else if (usuario.rol.toLowerCase() === 'profesor' || usuario.rol.toLowerCase() === 'administrador') {
      datosUsuario = await Profesors.findOne({ where: { id_usuario: usuario.id_usuario } });
    }

    res.json({ usuario: { ...usuario.toJSON(), datos: datosUsuario } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


module.exports = router;

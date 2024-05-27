const express = require('express');
const router = express.Router();
const { Profesors , Usuarios ,Asignacions } = require('../models');

// Get all profesores
router.get('/', async (req, res) => {
  try {
    const profesores = await Profesors.findAll({
      include: [{ model: Usuarios, as: 'usuarios' }]
    });
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profesores' });
  }
});

// Create a new profesor
router.post('/', async (req, res) => {
  const profesor = await Profesors.create(req.body);
  res.json(profesor);
});

// Get a profesor by id
router.get('/:id_profesor', async (req, res) => {
  const profesor = await Profesors.findByPk(req.params.id_profesor);
  res.json(profesor);
});

// Update a profesor by id
router.put('/:id_profesor', async (req, res) => {
  const profesor = await Profesors.update(req.body, {
    where: { id_profesor: req.params.id_profesor }
  });
  res.json(profesor);
});

// Delete a profesor by id
router.delete('/:id_profesor', async (req, res) => {
  try {
    const profesorId = req.params.id_profesor;

    // Delete related assignments first
    await Asignacions.destroy({ where: { id_profesor: profesorId } });

    // Delete the professor
    await Profesors.destroy({ where: { id_profesor: profesorId } });

    res.status(200).json({ message: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting profesor', error);
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
});

module.exports = router;

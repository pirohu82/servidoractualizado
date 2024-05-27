const express = require('express');
const router = express.Router();
const { Asignacions, Materia, Cursos, Paralelos } = require('../models');

// Get all asignaciones
router.get('/', async (req, res) => {
  const asignaciones = await Asignacions.findAll();
  res.json(asignaciones);
});

// Create a new asignacion
router.post('/', async (req, res) => {
  const asignacion = await Asignacions.create(req.body);
  res.json(asignacion);
});

// Get a asignacion by id
router.get('/:id_asignacion', async (req, res) => {
  const asignacion = await Asignacions.findByPk(req.params.id_asignacion);
  res.json(asignacion);
});

// Update a asignacion by id
router.put('/:id_asignacion', async (req, res) => {
  const asignacion = await Asignacions.update(req.body, {
    where: { id_asignacion: req.params.id_asignacion }
  });
  res.json(asignacion);
});

// Delete a asignacion by id
router.delete('/:id_asignacion', async (req, res) => {
  const asignacion = await Asignacions.destroy({
    where: { id_asignacion: req.params.id_asignacion }
  });
  res.json(asignacion);
});

router.get('/profesor/:id_profesor', async (req, res) => {
  try {
    const asignaciones = await Asignacions.findAll({
      where: { id_profesor: req.params.id_profesor },
      include: [
        { model: Materia, as: 'materia' },
        { model: Cursos, as: 'cursos' },
        { model: Paralelos, as: 'paralelos' },
      ],
    });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching asignaciones' });
  }
});
module.exports = router;

const express = require('express');
const router = express.Router();
const { Materia } = require('../models');

// Get all materias
router.get('/', async (req, res) => {
  const materias = await Materia.findAll();
  res.json(materias);
});

// Create a new materia
router.post('/', async (req, res) => {
  const materia = await Materia.create(req.body);
  res.json(materia);
});

// Get a materia by id
router.get('/:id_materia', async (req, res) => {
  const materia = await Materia.findByPk(req.params.id_materia);
  res.json(materia);
});

// Update a materia by id
router.put('/:id_materia', async (req, res) => {
  const materia = await Materia.update(req.body, {
    where: { id_materia: req.params.id_materia }
  });
  res.json(materia);
});

// Delete a materia by id
router.delete('/:id_materia', async (req, res) => {
  const materia = await Materia.destroy({
    where: { id_materia: req.params.id_materia }
  });
  res.json(materia);
});

module.exports = router;

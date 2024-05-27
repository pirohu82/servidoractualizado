const express = require('express');
const router = express.Router();
const { Cursos } = require('../models');

// Get all cursos
router.get('/', async (req, res) => {
  const cursos = await Cursos.findAll();
  res.json(cursos);
});

// Create a new curso
router.post('/', async (req, res) => {
  const cursos = await Cursos.create(req.body);
  res.json(cursos);
});

// Get a curso by id
router.get('/:id_curso', async (req, res) => {
  const cursos = await Cursos.findByPk(req.params.id_curso);
  res.json(cursos);
});

// Update a curso by id
router.put('/:id_curso', async (req, res) => {
  const cursos = await Cursos.update(req.body, {
    where: { id_curso: req.params.id_curso}
  });
  res.json(cursos);
});

// Delete a curso by id
router.delete('/:id_curso', async (req, res) => {
  const cursos = await Cursos.destroy({
    where: { id_curso: req.params.id_curso }
  });
  res.json(cursos);
});

module.exports = router;

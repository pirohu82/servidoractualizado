const express = require('express');
const router = express.Router();
const { Paralelos } = require('../models');

// Get all paralelos
router.get('/', async (req, res) => {
  const paralelos = await Paralelos.findAll();
  res.json(paralelos);
});

// Create a new paralelo
router.post('/', async (req, res) => {
  const paralelo = await Paralelos.create(req.body);
  res.json(paralelo);
});

// Get a paralelo by id
router.get('/:id_paralelo', async (req, res) => {
  const paralelo = await Paralelos.findByPk(req.params.id_paralelo);
  res.json(paralelo);
});

// Update a paralelo by id
router.put('/:id_paralelo', async (req, res) => {
  const paralelo = await Paralelos.update(req.body, {
    where: { id_paralelo: req.params.id_paralelo }
  });
  res.json(paralelo);
});

// Delete a paralelo by id
router.delete('/:id_paralelo', async (req, res) => {
  const paralelo = await Paralelos.destroy({
    where: { id_paralelo: req.params.id_paralelo }
  });
  res.json(paralelo);
});

module.exports = router;

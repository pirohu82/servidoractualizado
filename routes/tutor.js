const express = require('express');
const router = express.Router();
const { Tutors } = require('../models');

// Get all tutores
router.get('/', async (req, res) => {
  const tutores = await Tutors.findAll();
  res.json(tutores);
});

// Create a new tutor
router.post('/', async (req, res) => {
  const tutor = await Tutors.create(req.body);
  res.json(tutor);
});

// Get a tutor by id
router.get('/:id_tutor', async (req, res) => {
  const tutor = await Tutors.findByPk(req.params.id_tutor);
  res.json(tutor);
});

// Update a tutor by id
router.put('/:id_tutor', async (req, res) => {
  const tutor = await Tutors.update(req.body, {
    where: { id_tutor: req.params.id_tutor }
  });
  res.json(tutor);
});

// Delete a tutor by id
router.delete('/:id_tutor', async (req, res) => {
  const tutor = await Tutors.destroy({
    where: { id_tutor: req.params.id_tutor }
  });
  res.json(tutor);
});

module.exports = router;

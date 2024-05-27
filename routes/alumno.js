const express = require('express');
const router = express.Router();
const { Alumnos, Cursos, Paralelos, Tutors  , Usuarios} = require('../models');

router.get('/:id_alumno/curso-paralelo', async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const alumno = await Alumnos.findByPk(id_alumno, {
      include: [
        {
          model: Cursos,
          as: 'cursos',
          attributes: ['id_curso', 'nombre'],
        },
        {
          model: Paralelos,
          as: 'paralelos',
          attributes: ['id_paralelo', 'nombre'],
        },
      ],
    });

    if (!alumno) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.json({
      curso: alumno.cursos,
      paralelo: alumno.paralelos,
    });
  } catch (error) {
    console.error('Error al obtener curso y paralelo del alumno:', error);
    res.status(500).json({ error: 'Error al obtener curso y paralelo del alumno' });
  }
});


router.get('/filter', async (req, res) => {
  try {
    const { cursos, paralelos } = req.query;
    console.log('Cursos:', cursos, 'Paralelos:', paralelos);
    const alumnos = await Alumnos.findAll({
      where: {
        id_curso: cursos,
        id_paralelo: paralelos,
      },
      include: [
        { model: Usuarios, as: 'usuarios' },
        { model: Cursos, as: 'cursos' },
        { model: Paralelos, as: 'paralelos' },
        { model: Tutors, as: 'tutors' },
      ],
    });
    console.log('Alumnos:', alumnos);
    res.json(alumnos);
  } catch (error) {
    console.error('Error fetching Alumnos:', error);
    res.status(500).json({ error: 'Error fetching Alumnos' });
  }
});

router.get('/', async (req, res) => {
  try {
    const alumnos = await Alumnos.findAll({
      include: [
        { model: Usuarios, as: 'usuarios' },
        { model: Cursos, as: 'cursos' },
        { model: Paralelos, as: 'paralelos' },
        { model: Tutors, as: 'tutors' }
      ]
    });
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Alumnos' });
  }
});
// Create a new alumno
router.post('/', async (req, res) => {
  const alumno = await Alumnos.create(req.body);
  res.json(alumno);
});

// Get a alumno by id
router.get('/:id_alumno', async (req, res) => {
  const alumno = await Alumnos.findByPk(req.params.id_alumno, {
    include: [
      { model: Usuarios, as: 'usuarios' },
      { model: Cursos, as: 'cursos' },
      { model: Paralelos, as: 'paralelos' },
      { model: Tutors, as: 'tutors' }
    ]
  });
  res.json(alumno);
});

// Update a alumno by id
router.put('/:id_alumno', async (req, res) => {
  const alumno = await Alumnos.update(req.body, {
    where: { id_alumno: req.params.id_alumno }
  });
  res.json(alumno);
});

// Delete a alumno by id
router.delete('/:id_alumno', async (req, res) => {
  const alumno = await Alumnos.destroy({
    where: { id_alumno: req.params.id_alumno }
  });
  res.json(alumno);
});


module.exports = router;



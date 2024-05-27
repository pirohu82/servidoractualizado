const express = require('express');
const router = express.Router();
const { Actividads , Asignacions , Materia , Alumnos ,Cursos , Paralelos} = require('../models');

router.get('/curso-paralelo', async (req, res) => {
  const { id_alumno } = req.query;
  try {
    // Obtener el curso y paralelo del alumno
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

    const { id_curso, id_paralelo } = alumno;

    // Obtener las actividades del curso y paralelo del alumno
    const actividades = await Actividads.findAll({
      include: [{
        model: Asignacions,
        as: 'asignacions',
        where: { id_curso, id_paralelo },
        include: [{
          model: Materia,
          as: 'materia',
          attributes: ['nombre']
        }]
      }]
    });

    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});



router.get('/curso-paralelo', async (req, res) => {
  const { id_curso, id_paralelo } = req.query;
  try {
    console.log(`id_curso: ${id_curso}, id_paralelo: ${id_paralelo}`); // Log de depuración
    const actividades = await Actividads.findAll({
      include: [{
        model: Asignacions,
        as: 'asignacions',
        where: { id_curso, id_paralelo },
        include: [{
          model: Materia,
          as: 'materia',
          attributes: ['nombre']
        }]
      }]
    });

    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error); // Log de depuración
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
});
router.get('/asignacion/:id_asignacion', async (req, res) => {
  try {
    const actividades = await Actividads.findAll({
      where: { id_asignacion: req.params.id_asignacion },
      include: [{ model: Asignacions, as: 'asignacions' }]
    });
    console.log(actividades);

    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching actividades' });
  }
});

router.get('/', async (req, res) => {
  const actividades = await Actividads.findAll();
  res.json(actividades);
});

// Create a new actividad
router.post('/', async (req, res) => {
  const actividad = await Actividads.create(req.body);
  res.json(actividad);
});

// Get a actividad by id
router.get('/:id_actividad', async (req, res) => {
  const actividad = await Actividads.findByPk(req.params.id_actividad);
  res.json(actividad);
});

// Update a actividad by id
router.put('/:id_actividad', async (req, res) => {
  const actividad = await Actividads.update(req.body, {
    where: { id_actividad: req.params.id_actividad }
  });
  res.json(actividad);
});

// Delete a actividad by id
router.delete('/:id_actividad', async (req, res) => {
  const actividad = await Actividads.destroy({
    where: { id_actividad: req.params.id_actividad }
  });
  res.json(actividad);
});

module.exports = router;

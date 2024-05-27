const express = require('express');
const router = express.Router();
const { Calificacions, Alumnos, Materia, Cursos, Paralelos } = require('../models');


router.get('/estudiante/:id_alumno', async (req, res) => {
  try {
    const { id_alumno } = req.params;
    const calificaciones = await Calificacions.findAll({
      where: { id_alumno },
      include: [{
        model: Materia,
        as: 'materia',
        attributes: ['nombre']
      }]
    });
  //  console.log(calificaciones);
    res.json(calificaciones);
  } catch (error) {
    //console.log(calificaciones);
    res.status(500).json({ error: 'Error al obtener las calificaciones del estudiante' });
  }
});
// Obtener calificaciones de varios alumnos para una materia específica
router.get('/calificaciones/alumnos', async (req, res) => {
  const { alumnos, materia } = req.query;
  try {
    const calificaciones = await Calificacions.findAll({
      where: {
        id_alumno: { [Op.in]: alumnos.split(',') }, // Asegúrate de usar Op.in para arrays
        id_materia: materia,
      },
    });
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calificaciones' });
  }
});

router.get('/asignaciones/profesor/:idProfesor', async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll({
      where: { id_profesor: req.params.idProfesor },
      include: [
        { model: Cursos, as: 'cursos' },
        { model: Materia, as: 'materia' },
        { model: Paralelos, as: 'paralelos' }
      ]
    });
    res.json(asignaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching asignaciones' });
  }
});

// Guardar calificaciones
router.post('/calificaciones', async (req, res) => {
  const { calificaciones } = req.body;
  console.log('Datos recibidos para guardar calificaciones:', calificaciones);

  try {
    for (const calificacion of calificaciones) {
      const alumno = await Alumnos.findByPk(calificacion.id_alumno);
      const materia = await Materia.findByPk(calificacion.id_materia);

      if (!alumno) {
        return res.status(400).json({ error: `Alumno con id ${calificacion.id_alumno} no existe` });
      }
      if (!materia) {
        return res.status(400).json({ error: `Materia con id ${calificacion.id_materia} no existe` });
      }

      const existingCalificacion = await Calificacions.findOne({
        where: {
          id_alumno: calificacion.id_alumno,
          id_materia: calificacion.id_materia,
          trimestre: calificacion.trimestre,
        }
      });

      if (existingCalificacion) {
        const nombreAlumno = alumno.nombre; // Obtenemos el nombre del alumno
        const nombreMateria = materia.nombre; // Obtenemos el nombre de la materia
        return res.status(400).json({ error: `Ya existe una calificación para el alumno ${nombreAlumno} en la materia ${nombreMateria} para el trimestre ${calificacion.trimestre}` });
      
      }
    }

    const records = calificaciones.map(calificacion => ({
      id_alumno: calificacion.id_alumno,
      id_materia: calificacion.id_materia,
      trimestre: calificacion.trimestre,
      ser: calificacion.ser,
      saber: calificacion.saber,
      hacer: calificacion.hacer,
      decidir: calificacion.decidir,
      autoevaluacion: calificacion.autoevaluacion,
    }));

    console.log('Registros a insertar:', records);

    await Calificacions.bulkCreate(records);
    res.status(201).json({ message: 'Calificaciones registradas correctamente' });
  } catch (error) {
    console.error('Error al registrar calificaciones:', error);
    res.status(500).json({ error: 'Error al registrar calificaciones' });
  }
});

// Obtener todas las calificaciones
router.get('/', async (req, res) => {
  const calificaciones = await Calificacions.findAll();
  res.json(calificaciones);
});

// Obtener calificación por id
/*
router.get('/:id_calificacion', async (req, res) => {
  const calificacion = await Calificacions.findByPk(req.params.id_calificacion);
  res.json(calificacion);
});
*/
// Obtener calificaciones por alumno y materia
router.get('/alumno/:id_alumno/materia/:id_materia', async (req, res) => {
  const { id_alumno, id_materia } = req.params;
  try {
    const calificaciones = await Calificacions.findAll({
      where: {
        id_alumno,
        id_materia,
      }
    });
    res.json(calificaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calificaciones' });
  }
});

// Actualizar calificación por id
router.put('/:id_calificacion', async (req, res) => {
  const calificacion = await Calificacions.update(req.body, {
    where: { id_calificacion: req.params.id_calificacion }
  });
  res.json(calificacion);
});

// Eliminar calificación por id
router.delete('/:id_calificacion', async (req, res) => {
  const calificacion = await Calificacions.destroy({
    where: { id_calificacion: req.params.id_calificacion }
  });
  res.json(calificacion);
});

module.exports = router;

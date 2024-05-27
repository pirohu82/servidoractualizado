const express = require('express');
const router = express.Router();
const { Asistencia , Asignacions , Materia} = require('../models');
const { Op, Sequelize } = require('sequelize');
const moment = require('moment');

router.get('/alumno/:id_alumno', async (req, res) => {
  const { id_alumno } = req.params;
  try {
    // Obtener las asistencias del alumno
    const asistencias = await Asistencia.findAll({
      where: { id_alumno },
      include: [{
        model: Asignacions,
        as: 'asignacions',
        include: [{
          model: Materia,
          as: 'materia',
          attributes: ['nombre']
        }]
      }]
    });

    res.json(asistencias);
  } catch (error) {
    console.error('Error al obtener asistencias:', error);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
});

router.get('/', async (req, res) => {
  const asistencias = await Asistencia.findAll();
  res.json(asistencias);
});

// Create a new asistencia
router.post('/', async (req, res) => {
  const { idProfesor, idAsignacion, asistencia , trimestre } = req.body;
  const fechaHoy = moment().startOf('day').format('YYYY-MM-DD');

  try {
    // Verificar si ya se ha registrado asistencia hoy para los alumnos
    const asistenciasHoy = await Asistencia.findAll({
      where: {
        id_asignacion: idAsignacion,
        [Op.and]: Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), '=', fechaHoy)
      },
    });

    console.log('Asistencias registradas hoy:', asistenciasHoy);

    // Filtrar los alumnos que ya tienen asistencia registrada hoy
    const alumnosConAsistenciaHoy = asistenciasHoy.map(a => a.id_alumno);
    console.log('Alumnos con asistencia hoy:', alumnosConAsistenciaHoy);

    const nuevasAsistencias = Object.keys(asistencia).filter(idAlumno => !alumnosConAsistenciaHoy.includes(Number(idAlumno)));
    console.log('Nuevas asistencias a registrar:', nuevasAsistencias);

    const records = nuevasAsistencias.map(idAlumno => ({
      id_profesor: idProfesor,
      id_alumno: idAlumno,
      id_asignacion: idAsignacion,
      estado: asistencia[idAlumno],
      fecha: fechaHoy,
      trimestre: trimestre,
    }));

    console.log('Records a insertar:', records);

    if (records.length > 0) {
      await Asistencia.bulkCreate(records);
    }
    res.status(201).json({ message: 'Asistencia registrada correctamente' });
  } catch (error) {
    console.error('Error al registrar asistencia:', error);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
});

// Verificar asistencia por fecha y asignacion
router.get('/verificar', async (req, res) => {
  const { idAsignacion, fecha } = req.query;
  try {
    const asistencias = await Asistencia.findAll({
      where: {
        id_asignacion: idAsignacion,
        [Op.and]: Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), '=', fecha)
      },
    });
    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching asistencia' });
  }
});

// Get a asistencia by id
router.get('/:id_asistencia', async (req, res) => {
  const asistencia = await Asistencia.findByPk(req.params.id_asistencia);
  res.json(asistencia);
});

// Update a asistencia by id
router.put('/:id_asistencia', async (req, res) => {
  const asistencia = await Asistencia.update(req.body, {
    where: { id_asistencia: req.params.id_asistencia }
  });
  res.json(asistencia);
});

// Delete a asistencia by id
router.delete('/:id_asistencia', async (req, res) => {
  const asistencia = await Asistencia.destroy({
    where: { id_asistencia: req.params.id_asistencia }
  });
  res.json(asistencia);
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors'); // Importa cors
const app = express();
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.stack || err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
// Middleware
app.use(bodyParser.json());
app.use(cors()); 
// Import routes
const usuarioRoutes = require('./routes/usuarios');
const profesorRoutes = require('./routes/profesor');
const alumnoRoutes = require('./routes/alumno');
const tutorRoutes = require('./routes/tutor');
const cursoRoutes = require('./routes/curso');
const paraleloRoutes = require('./routes/paralelo');
const materiaRoutes = require('./routes/materia');
const asignacionRoutes = require('./routes/asignacion');
const calificacionRoutes = require('./routes/calificacion');
const asistenciaRoutes = require('./routes/asistencia');
const actividadRoutes = require('./routes/actividad');

// Use routes
app.use('/usuarios', usuarioRoutes);
app.use('/profesores', profesorRoutes);
app.use('/alumnos', alumnoRoutes);

app.use('/tutores', tutorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/paralelos', paraleloRoutes);
app.use('/materias', materiaRoutes);
app.use('/asignaciones', asignacionRoutes);
app.use('/calificaciones', calificacionRoutes);
app.use('/asistencias', asistenciaRoutes);
app.use('/actividades', actividadRoutes);

const PORT = process.env.PORT || 3000;
;

// Sync database and start server

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

module.exports = (sequelize, DataTypes) => {
  const Alumnos = sequelize.define('Alumnos', {
    id_alumno: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_curso: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cursos',
        key: 'id_curso'
      }
    },
    id_paralelo: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Paralelos',
        key: 'id_paralelo'
      }
    },
    ci: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tutors',
        key: 'id_tutor'
      }
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id_usuario'
      }
    }
  });
  Alumnos.associate = function(models) {
    Alumnos.belongsTo(models.Tutors, { foreignKey: 'id_tutor' ,as: 'tutors' });
    Alumnos.belongsTo(models.Cursos, { foreignKey: 'id_curso', as: 'cursos' });
    Alumnos.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'usuarios' });
    Alumnos.belongsTo(models.Paralelos, { foreignKey: 'id_paralelo' , as: 'paralelos' });
    Alumnos.hasMany(models.Asistencia, { foreignKey: 'id_alumno', as: 'asistencia' });
    
  };
  return Alumnos;
};

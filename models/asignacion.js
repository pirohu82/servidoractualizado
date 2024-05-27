module.exports = (sequelize, DataTypes) => {
  const Asignacions = sequelize.define('Asignacions', {
    id_asignacion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_profesor: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profesors',
        key: 'id_profesor'
      }
    },
    id_materia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Materia',
        key: 'id_materia'
      }
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
    }
  });
  Asignacions.associate = function(models) {
    Asignacions.belongsTo(models.Profesors, { foreignKey: 'id_profesor', as: 'profesors' });
    Asignacions.belongsTo(models.Materia, { foreignKey: 'id_materia'  ,as: 'materia' });
    Asignacions.belongsTo(models.Cursos, { foreignKey: 'id_curso', as: 'cursos' });
    Asignacions.belongsTo(models.Paralelos, { foreignKey: 'id_paralelo', as: 'paralelos' });
    Asignacions.hasMany(models.Actividads, { foreignKey: 'id_asignacion', as: 'actividads' });
    Asignacions.hasMany(models.Asistencia, { foreignKey: 'id_asignacion', as: 'asistencia' });
    
  };
  return Asignacions;
};

module.exports = (sequelize, DataTypes) => {
  const Asistencia = sequelize.define('Asistencia', {
    id_asistencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Alumnos',
        key: 'id_alumno'
      }
    },
    id_asignacion: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Asignacions',
        key: 'id_asignacion'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trimestre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Asistencia.associate = function(models) {
    Asistencia.belongsTo(models.Alumnos, { foreignKey: 'id_alumno', as : 'alumnos'});
    
    Asistencia.belongsTo(models.Asignacions, { foreignKey: 'id_asignacion', as: 'asignacions' });
  
  };
  return Asistencia;
};

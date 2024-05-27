module.exports = (sequelize, DataTypes) => {
  const Calificacions = sequelize.define('Calificacions', {
    id_calificacion: {
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
    id_materia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Materia',
        key: 'id_materia'
      }
    },
    trimestre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    saber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hacer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    decidir: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    autoevaluacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.ser + this.saber + this.hacer + this.decidir + this.autoevaluacion;
      },
      set(value) {
        throw new Error('Do not try to set the `total` value!');
      }
    }
  });
  Calificacions.associate = function (models) {
    Calificacions.belongsTo(models.Alumnos, { foreignKey: 'id_alumno', as: 'alumnos' });
    Calificacions.belongsTo(models.Materia, { foreignKey: 'id_materia', as: 'materia' });

  };
  return Calificacions;
};

module.exports = (sequelize, DataTypes) => {
  const Tutors = sequelize.define('Tutors', {
    id_tutor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parentesco: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Tutors.associate = function(models) {
    Tutors.hasMany(models.Alumnos, { foreignKey: 'id_tutor' });
  };
  return Tutors;
};

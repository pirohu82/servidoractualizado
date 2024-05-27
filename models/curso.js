module.exports = (sequelize, DataTypes) => {
  const Cursos = sequelize.define('Cursos', {
    id_curso: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Cursos.associate = function(models) {
    Cursos.hasMany(models.Alumnos, { foreignKey: 'id_curso' });
    Cursos.hasMany(models.Asignacions, { foreignKey: 'id_curso' });
  };
  return Cursos;
};

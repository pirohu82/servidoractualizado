module.exports = (sequelize, DataTypes) => {
  const Materia = sequelize.define('Materia', {
    id_materia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Materia.associate = function(models) {
    Materia.hasMany(models.Asignacions, { foreignKey: 'id_materia', as: 'asignacions' });
  };
  return Materia;
};

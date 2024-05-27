module.exports = (sequelize, DataTypes) => {
  const Paralelos = sequelize.define('Paralelos', {
    id_paralelo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Paralelos.associate = function(models) {
    Paralelos.hasMany(models.Asignacions, { foreignKey: 'id_paralelo' });
  };
  return Paralelos;
};

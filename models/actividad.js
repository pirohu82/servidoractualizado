module.exports = (sequelize, DataTypes) => {
  const Actividads = sequelize.define('Actividads', {
    id_actividad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_asignacion: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Asignacions',
        key: 'id_asignacion'
      }
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trimestre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Actividads.associate = function(models) {
    Actividads.belongsTo(models.Asignacions, { foreignKey: 'id_asignacion' ,as: 'asignacions' });
  };
  return Actividads;
};

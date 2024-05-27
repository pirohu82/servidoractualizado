module.exports = (sequelize, DataTypes) => {
  const Profesors = sequelize.define('Profesors', {
    id_profesor: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
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
    correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rude: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ci: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id_usuario'
      }
    }
  });
  Profesors.associate = function(models) {
    Profesors.belongsTo(models.Usuarios, { foreignKey: 'id_usuario', as: 'usuarios'});
  };
  return Profesors;
};

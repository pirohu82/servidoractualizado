module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('Usuarios', {
      id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Usuarios;
  };
  
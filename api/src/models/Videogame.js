const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      // allowNull ---> significa (te permito que este vacio)
      // primaryKey ---> significa que va a ser la clave primaria(el id)
      // UUID ---> genera un id alfa numerico unico
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   desciption:{
    type: DataTypes.STRING,
    allowNull: false,
   },
   dataInfo:{
    type: DataTypes.STRING,
    allowNull: true,
   },
   rating:{
    type: DataTypes.STRING,
    allowNull: true,
   },
  //  platform:{
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //  },
  createInDb:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:true,
   },
});
};

// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

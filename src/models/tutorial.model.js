// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../database/sequelize");


// const Tutorial = sequelize.define(
//   "Tutorial",
//   {
//     title: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     publicStatus: {
//       type: DataTypes.STRING(10),
//       allowNull: false,
//     },
//     image: {
//       type: DataTypes.STRING(),
//     },
//   },
//   {
//     timestamps: true,
//   }
// );
// sequelize.sync();
// module.exports = {
//   Tutorial,
// };

const tutorialModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Tutorial",
    {
      title: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicStatus: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(),
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = {
  tutorialModel,
};

// const { sequelize } = require("../database/sequelize");
// const { DataTypes } = require("sequelize");

// const User = sequelize.define(
//   "User",
//   {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       defaultValue: "user",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = {
//   User,
// };

const userModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      avatar: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
    }
  );
};
module.exports = {
  userModel,
};

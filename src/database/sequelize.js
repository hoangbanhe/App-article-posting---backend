const { Sequelize, DataTypes } = require("sequelize");
const mysql = require("mysql2");
const { userModel } = require("../models/user.model");
const { tutorialModel } = require("../models/tutorial.model");
const { tagModel } = require("../models/tag.model");

const host = "localhost";
const port = 3306;
const user = "root";
const password = "123123";
const databaseName = "newdbtest";

const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXITS ${databaseName}`);
const sequelize = new Sequelize(databaseName, user, password, {
  host,
  dialect: "mysql",
  pool: {
    max: 5, 
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const User = userModel(sequelize, DataTypes);
const Tutorial = tutorialModel(sequelize, DataTypes);
const Tag = tagModel(sequelize, DataTypes);

User.hasMany(Tutorial);

Tutorial.belongsTo(User);

//Dinh nghia moi quan he nhieu nhieu tag vs tutorial
Tutorial.belongsToMany(Tag, { through: "TutorialTag" });
Tag.belongsToMany(Tutorial, { through: "TutorialTag" });

sequelize.sync();
module.exports = {
  sequelize,
  User,
  Tutorial,
  Tag,
};

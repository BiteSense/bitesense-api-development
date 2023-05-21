const Sequelize = require("sequelize");
const db = require("../../configs/dbConfig");

// Schema

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    token: {
      type: DataTypes.STRING,
    },
    no_telepon: {
      type: DataTypes.STRING,
    },
    foto_user: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;

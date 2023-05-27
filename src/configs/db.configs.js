const { Sequelize } = require("sequelize");

const db = new Sequelize("production_bitesense", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

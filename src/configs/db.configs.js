const { Sequelize } = require("sequelize");

const db = new Sequelize("bitesense_database", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

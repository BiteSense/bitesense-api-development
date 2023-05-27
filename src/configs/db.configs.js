const { Sequelize } = require("sequelize");

const db = new Sequelize("bitesense_db_staging", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

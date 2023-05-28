const { Sequelize } = require("sequelize");

const db = new Sequelize("bitesense", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;

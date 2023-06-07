const { Sequelize } = require("sequelize");

const db = new Sequelize("bitesense", "root", "", {
  host: process.env.DB_HOST || "localhost",
  dialect: "mysql",
});

module.exports = db;

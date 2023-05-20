const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: "root",
  password: "",
  database: process.env.DATABASE,
});

module.exports = db;

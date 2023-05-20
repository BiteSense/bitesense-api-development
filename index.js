const express = require("express");
const db = require("./src/configs/dbConfig.js");
const app = express();
const env = require("dotenv");
env.config();
const port = 3000;

try {
  db.connect((err) => {
    if (err) throw err;
    console.log("connected...");
  });
} catch (error) {
  throw error;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

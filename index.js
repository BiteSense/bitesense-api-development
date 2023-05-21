const express = require("express");
const db = require("./src/configs/dbConfig.js");
const route = require("./src/routes/user-route/user_route");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const env = require("dotenv");
const port = 3000;

const app = express();
env.config();

try {
  //DB CONNECTION
  db.authenticate();
  console.log("connected");
} catch (error) {
  console.log(error);
}
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Handling route
app.use("/api/user", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

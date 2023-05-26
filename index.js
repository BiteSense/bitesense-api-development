const express = require("express");
const db = require("./src/configs/db.configs");
const route = require("./src/routes/user.routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const env = require("dotenv");
const port = 3000;

const app = express();
env.config();
//Middle Multer File
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

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
app.use(multerMid.single("file"));
app.use(cookieParser());

// Handling route
app.use("/api/user", route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

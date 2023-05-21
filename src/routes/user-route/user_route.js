const express = require("express");
const route = express.Router();
const verifyToken = require("../../middleware/verifyToken");

const myModule = require("../../controllers/handle-user/user_handler.js");

route.post("/register", myModule.handlerRegister);
route.post("/login", myModule.handlerLogin);
route.delete("/logout", myModule.handlerLogout);
route.get("/testing", verifyToken, (req, res) => {
  res.send("look at me");
});

module.exports = route;
